package com.bdo.automaticinsurance.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "user_info")
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String yas;
    private String saglik;
    private String meslek;
    private String gelir;
    private String sigara;
    private String alkol;
    private String gecmis;
    private String medeni;
    private String malvarligi;

    private String krediSonucu; // DMN'den dönen sonuç
}
