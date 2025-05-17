package com.bdo.automaticinsurance.config;

import jakarta.annotation.PostConstruct;
import org.camunda.bpm.engine.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;

@Configuration
public class DmnDeployer {
    @Autowired
    private RepositoryService repositoryService;

    @PostConstruct
    public void deployDmnFiles() {
        try {
            // Dosyanın classpath'teki doğru yolunu belirtiyoruz
            ClassPathResource resource = new ClassPathResource("decision-tables/automatic_insurance.dmn");
            repositoryService.createDeployment()
                    // Camunda içinde kaydedilecek kaynak adını dosya adıyla aynı yapıyoruz
                    .addInputStream("automatic_insurance.dmn", resource.getInputStream())
                    .name("Insurance Decision Deployment")
                    .deploy();
        } catch (IOException e) {
            // Hata durumunda detaylı loglama yapmak faydalı olabilir
            e.printStackTrace(); // Hatanın stack trace'ini konsola yazdır
            throw new RuntimeException("DMN deployment failed", e);
        }
    }
}
