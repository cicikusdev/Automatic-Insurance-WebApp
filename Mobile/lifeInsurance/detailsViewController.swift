//
//  detailsViewController.swift
//  lifeInsurance
//
//  Created by İsmail Can Durak on 4.05.2025.
//

import UIKit

class detailsViewController: UIViewController, UIPickerViewDelegate, UIPickerViewDataSource {

    @IBOutlet weak var maleButton: UIButton!
    
    @IBOutlet weak var femaleButton: UIButton!
    
    @IBOutlet weak var ageSlider: UISlider!
    
    @IBOutlet weak var incomeSlider: UISlider!
    
    @IBOutlet weak var healthStatsPicker: UIPickerView!
    @IBOutlet weak var jobPicker: UIPickerView!
    
    @IBOutlet weak var insurancePicker: UIPickerView!
    
    @IBOutlet weak var maritialStatsPicker: UIPickerView!
    
    @IBOutlet weak var assetsPicker: UIPickerView!
    
    @IBOutlet weak var smokerSwitch: UISwitch!
    @IBOutlet weak var alcholSwitch: UISwitch!
    
    
var userInput = UserInput(
           gender: "",
           ageRange: 0,
           healthStatus: "",
           job: "",
           incomeRange: 0,
           smoker: false,
           alcohol: false,
           insuranceHistory: "",
           maritalStatus: "",
           assetOwnership: ""
       )

       let healthOptions = ["Çok İyi", "İyi", "Orta", "Kötü"]
       let jobOptions = ["Mühendis", "Pilot", "Şoför", "Doktor", "Öğretmen", "Öğrenci", "Diğer"]
       let insuranceHistoryOptions = ["Temiz", "Problemli"]
       let maritalOptions = ["Evli", "Bekar"]
       let assetOptions = ["Ev var", "Araba var", "İkisi de var", "Hiçbiri"]

    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Picker delegates and data sources
        healthStatsPicker.delegate = self
        healthStatsPicker.dataSource = self
        jobPicker.delegate = self
        jobPicker.dataSource = self
        insurancePicker.delegate = self
        insurancePicker.dataSource = self
        maritialStatsPicker.delegate = self
        maritialStatsPicker.dataSource = self
        assetsPicker.delegate = self
        assetsPicker.dataSource = self
        // Slider min/max values
        ageSlider.minimumValue = 18
        ageSlider.maximumValue = 60
        incomeSlider.minimumValue = 0
        incomeSlider.maximumValue = 20000

        updateGenderUI()

        // Do any additional setup after loading the view.
    }
    func updateGenderUI() {
        if userInput.gender == "female" {
            femaleButton.backgroundColor = UIColor.systemPink
            femaleButton.transform = CGAffineTransform(scaleX: 1.1, y: 1.1)
            maleButton.backgroundColor = UIColor.clear
            maleButton.transform = .identity
            setGradientBackground(color1: UIColor.systemPink, color2: UIColor.white)
        } else if userInput.gender == "male" {
            maleButton.backgroundColor = UIColor.systemBlue
            maleButton.transform = CGAffineTransform(scaleX: 1.1, y: 1.1)
            femaleButton.backgroundColor = UIColor.clear
            femaleButton.transform = .identity
            setGradientBackground(color1: UIColor.systemBlue, color2: UIColor.white)
        }
    }

    func setGradientBackground(color1: UIColor, color2: UIColor) {
        let gradientLayer = CAGradientLayer()
        gradientLayer.colors = [color1.cgColor, color2.cgColor]
        gradientLayer.startPoint = CGPoint(x: 0.0, y: 0.5)
        gradientLayer.endPoint = CGPoint(x: 1.0, y: 0.5)
        gradientLayer.frame = view.bounds

        if let oldGradient = view.layer.sublayers?.first(where: { $0 is CAGradientLayer }) {
            view.layer.replaceSublayer(oldGradient, with: gradientLayer)
        } else {
            view.layer.insertSublayer(gradientLayer, at: 0)
        }
    }

    @IBAction func genderButtonTapped(_ sender: UIButton) {
        userInput.gender = (sender == femaleButton) ? "female" : "male"
        updateGenderUI()
    }
    
    
    
    // MARK: - Picker View DataSource & Delegate
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }

    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        switch pickerView {
        case healthStatsPicker: return healthOptions.count
        case jobPicker: return jobOptions.count
        case insurancePicker: return insuranceHistoryOptions.count
        case maritialStatsPicker: return maritalOptions.count
        case assetsPicker: return assetOptions.count
        default: return 0
        }
    }

    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        switch pickerView {
        case healthStatsPicker: return healthOptions[row]
        case jobPicker: return jobOptions[row]
        case insurancePicker: return insuranceHistoryOptions[row]
        case maritialStatsPicker: return maritalOptions[row]
        case assetsPicker: return assetOptions[row]
        default: return nil
        }
    }

    // MARK: - Capture Switch and Slider Values
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        userInput.smoker = smokerSwitch.isOn
        userInput.alcohol = alcholSwitch.isOn
        userInput.ageRange = ageSlider.value
        userInput.incomeRange = incomeSlider.value
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
