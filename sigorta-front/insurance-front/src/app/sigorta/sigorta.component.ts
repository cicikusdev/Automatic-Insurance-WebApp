import { Component, OnInit } from '@angular/core';
import { SigortaService, UserInfo } from '../services/sigorta.service';



@Component({
  selector: 'app-sigorta',
  templateUrl: './sigorta.component.html',
  styleUrls: ['./sigorta.component.css'],
  standalone: false
})
export class SigortaComponent implements OnInit {
  questions = [
    { text: 'Yaşınızı seçin', options: ['15-17', '18-25', '26-40', '41-60', '60+'], field: 'yas' },
    { text: 'Sağlık durumunuz?', options: ['Çok İyi', 'İyi', 'Orta', 'Kötü'], field: 'saglik' },
    { text: 'Mesleğiniz?', options: ['Mühendis', 'Pilot', 'Şoför', 'Doktor', 'Öğretmen', 'Öğrenci', 'Diğer', ], field: 'meslek' },
    { text: 'Gelir durumunuz?', options: ['0-5000', '5000-10000', '10000-20000', '20000+'], field: 'gelir' },
    { text: 'Sigara kullanıyor musunuz?', options: ['Evet', 'Hayır'], field: 'sigara' },
    { text: 'Alkol kullanıyor musunuz?', options: ['Evet', 'Hayır'], field: 'alkol' },
    { text: 'Geçmiş sigorta kayıtlarınız?', options: ['Temiz', 'Problemli'], field: 'gecmis' },
    { text: 'Medeni durumunuz?', options: ['Evli', 'Bekar'], field: 'medeni' },
    { text: 'Mal varlığınız?', options: ['Ev var', 'Araba var', 'İkisi de var', 'Hiçbiri'], field: 'malvarligi' }
  ];

  userInfo = {
    name: '',
    surname: '',
    tc: ''
  };

  currentQuestionIndex = 0;
  answers: any = {};
  formSubmitted = false;
  sigortaSonucu: string = '';
  showQuestions = false;
  isBackendConnected = false;
  loading = false;
  error = '';

  constructor(private sigortaService: SigortaService) { }

  ngOnInit(): void {
    // Backend bağlantısını kontrol et
    this.checkBackendConnection();
  }

  checkBackendConnection(): void {
    this.sigortaService.checkStatus().subscribe({
      next: (response) => {
        this.isBackendConnected = true;
        console.log('Backend bağlantısı başarılı:', response);
      },
      error: (error) => {
        this.isBackendConnected = false;
        console.error('Backend bağlantısı başarısız:', error);
      }
    });
  }

  startQuiz() {
    if (this.userInfo.name && this.userInfo.surname && this.userInfo.tc) {
      this.showQuestions = true;
    } else {
      alert("Lütfen tüm bilgileri eksiksiz girin.");
    }
  }

  nextQuestion(selectedOption: string) {
    // Check if we have a valid question index first
    if (this.currentQuestionIndex < this.questions.length) {
      const currentField = this.questions[this.currentQuestionIndex].field;
      this.answers[currentField] = selectedOption;

      // Check if we're now at the last question
      if (this.currentQuestionIndex === this.questions.length - 1) {
        console.log('All questions answered, submitting form');
        // This is the last question, prepare to submit the form
        this.submitForm();
      } else {
        // Increment to the next question if not the last one
        this.currentQuestionIndex++;
      }
    }
  }

  submitForm() {
    // Form gönderilirken yükleniyor durumunu aktifleştir
    this.loading = true;
    this.error = '';
    this.formSubmitted = true;

    const formData = {
      ...this.answers,
      name: this.userInfo.name,
      surname: this.userInfo.surname,
      tc: this.userInfo.tc
    };

    console.log('Form data being submitted:', formData);

    this.sigortaService.submitApplication(formData).subscribe({
      next: (response: UserInfo) => {
        // Backend'den gelen sonucu göster
        console.log('Backend response:', response);
        this.sigortaSonucu = this.formatInsuranceResult(response.krediSonucu);
        this.loading = false;
      },
      error: (error) => {
        console.error('Form gönderilirken hata oluştu', error);
        this.error = 'Sigorta değerlendirmesi yapılırken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.';
        this.loading = false;
      }
    });
  }

  // DMN'den dönen sonucu Türkçe'ye çevir
  formatInsuranceResult(result: string | undefined): string {
    if (!result) return 'Değerlendirme sonucu alınamadı.';

    switch(result) {
      case 'Insurance Approved':
        return 'Tebrikler! Sigorta başvurunuz onaylandı.';
      case 'Insurance Approved (Special Case)':
        return 'Tebrikler! Sigorta başvurunuz özel durum olarak onaylandı.';
      case 'Insurance Denied':
        return 'Üzgünüz, sigorta başvurunuz reddedildi.';
      default:
        return result;
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  resetForm() {
    this.currentQuestionIndex = 0;
    this.answers = {};
    this.formSubmitted = false;
    this.sigortaSonucu = '';
    this.error = '';
  }

  isSelected(option: string): boolean {
    if (this.currentQuestionIndex >= this.questions.length) {
      return false;
    }

    const currentField = this.questions[this.currentQuestionIndex].field;
    return this.answers[currentField] === option;
  }

  startNewUser() {
    this.userInfo = { name: '', surname: '', tc: '' };
    this.showQuestions = false;
    this.currentQuestionIndex = 0;
    this.formSubmitted = false;
    this.sigortaSonucu = '';
    this.error = '';
    this.resetForm();
  }

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
