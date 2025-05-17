import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface UserInfo {
  id?: number;
  yas: string;
  saglik: string;
  meslek: string;
  gelir: string;
  sigara: string;
  alkol: string;
  gecmis: string;
  medeni: string;
  malvarligi: string;
  krediSonucu?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SigortaService {
  // Backend API URL
  private apiUrl = 'http://localhost:8081/api/users';

  constructor(private http: HttpClient) { }

  // API'ye bağlanıp kullanıcı başvurusunu değerlendirme
  submitApplication(formData: any): Observable<UserInfo> {
    console.log('Sending data to backend:', formData); // Debug log

    // UserInfo modeli ile uyumlu veri gönderiyoruz
    const userInfoData: UserInfo = {
      yas: this.mapAgeRange(formData.yas),
      saglik: this.mapHealthStatus(formData.saglik),
      meslek: this.mapProfession(formData.meslek),
      gelir: this.mapIncome(formData.gelir),
      sigara: this.mapYesNo(formData.sigara),
      alkol: this.mapYesNo(formData.alkol),
      gecmis: this.mapHistory(formData.gecmis),
      medeni: this.mapMaritalStatus(formData.medeni),
      malvarligi: this.mapAsset(formData.malvarligi)
    };

    console.log('Mapped data for backend:', userInfoData); // Debug log

    // Backend'e gönder ve cevabı bekle
    return this.http.post<UserInfo>(`${this.apiUrl}/evaluate`, userInfoData);
  }

  // Backend servisinin çalışıp çalışmadığını kontrol et
  checkStatus(): Observable<string> {
    return this.http.get(`${this.apiUrl}/status`, { responseType: 'text' });
  }

  // Frontend'deki Türkçe değerleri backend'in beklediği İngilizce değerlere dönüştür
  private mapAgeRange(age: string): string {
    if (!age) return '30'; // Default value if undefined

    switch(age) {
      case '15-17': return '17';
      case '18-25': return '25';
      case '26-40': return '40';
      case '41-60': return '60';
      case '60+': return '65';
      default: return '30'; // Default değer
    }
  }

  private mapHealthStatus(health: string): string {
    if (!health) return 'Average'; // Default value if undefined

    switch(health) {
      case 'Çok İyi': return 'Very Good';
      case 'İyi': return 'Good';
      case 'Orta': return 'Average';
      case 'Kötü': return 'Poor';
      default: return 'Average';
    }
  }

  private mapProfession(profession: string): string {
    if (!profession) return 'Other'; // Default value if undefined

    switch(profession) {
      case 'Mühendis': return 'Engineer';
      case 'Pilot': return 'Pilot';
      case 'Şoför': return 'Driver';
      case 'Öğrenci': return 'Student';
      case 'Doktor': return 'Doctor';
      case 'Öğretmen': return 'Teacher';
      case 'Diğer': return 'Other';
      default: return 'Other';
    }
  }

  private mapIncome(income: string): string {
    if (!income) return '10000'; // Default value if undefined

    switch(income) {
      case '0-5000': return '4000';
      case '5000-10000': return '8000';
      case '10000-20000': return '15000';
      case '20000+': return '25000';
      default: return '10000';
    }
  }

  private mapYesNo(value: string): string {
    if (!value) return 'No'; // Default value if undefined
    return value === 'Evet' ? 'Yes' : 'No';
  }

  private mapHistory(history: string): string {
    if (!history) return 'Clean'; // Default value if undefined
    return history === 'Temiz' ? 'Clean' : 'Problematic';
  }

  private mapMaritalStatus(status: string): string {
    if (!status) return 'Single'; // Default value if undefined
    return status === 'Evli' ? 'Married' : 'Single';
  }

  private mapAsset(asset: string): string {
    if (!asset) return 'None'; // Default value if undefined

    switch(asset) {
      case 'Ev var': return 'House';
      case 'Araba var': return 'Car';
      case 'İkisi de var': return 'Both';
      case 'Hiçbiri': return 'None';
      default: return 'None';
    }
  }
}
