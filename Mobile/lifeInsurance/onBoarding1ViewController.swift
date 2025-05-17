//
//  ViewController.swift
//  lifeInsurance
//
//  Created by İsmail Can Durak on 4.05.2025.
//

import UIKit

class ViewController: UIViewController {
    
    private let gradientLayer = CAGradientLayer()

    @IBOutlet weak var illustrationImage: UIImageView!
    @IBOutlet weak var titleLabel: UILabel!
    
    @IBOutlet weak var subtitleLabel: UILabel!
    
    @IBOutlet weak var nextButton: UIButton!
    
    @IBOutlet weak var pageControl: UIPageControl!
    
    @IBOutlet weak var cardView: UIView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // 1. Renkleri ayarla (mavi → beyaz)
               gradientLayer.colors = [
                   UIColor.systemBlue.cgColor,
                   UIColor.white.cgColor
               ]

        // 2. Başlangıç ve bitiş noktalarını belirle (soldan → sağa)
                gradientLayer.startPoint = CGPoint(x: 0.0, y: 0.5)
                gradientLayer.endPoint   = CGPoint(x: 1.0, y: 0.5)
               // 3. Layer’ı view’ın layer hiyerarşisine ekle
               view.layer.insertSublayer(gradientLayer, at: 0)
        // Do any additional setup after loading the view.
        cardView.layer.cornerRadius = 16
        cardView.layer.shadowColor = UIColor.black.cgColor
        cardView.layer.shadowOpacity = 0.1
        cardView.layer.shadowOffset = .zero
        cardView.layer.shadowRadius = 10
        cardView.backgroundColor = .white
        illustrationImage.image = UIImage(named: "onboard1")
        illustrationImage.layer.cornerRadius = illustrationImage.frame.width / 2
        illustrationImage.layer.masksToBounds = true
        
        
    }
    override func viewDidLayoutSubviews() {
          super.viewDidLayoutSubviews()
          // View’ın boyutu değiştiğinde gradient’in boyutunu güncelle
          gradientLayer.frame = view.bounds
      }

    @IBAction func nextButtonTapped(_ sender: Any) {
        performSegue(withIdentifier: "toOnboard2", sender: nil)
    }
    
}

