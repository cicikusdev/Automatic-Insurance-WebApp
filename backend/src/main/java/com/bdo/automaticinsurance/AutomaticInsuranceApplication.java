package com.bdo.automaticinsurance;

import org.apache.ibatis.mapping.Environment;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;

@SpringBootApplication
public class AutomaticInsuranceApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(AutomaticInsuranceApplication.class, args);

        ConfigurableEnvironment env = context.getEnvironment();
        String schemaUpdate = env.getProperty("camunda.bpm.database.schema-update");
        System.out.println(">>> camunda.bpm.database.schema-update = " + schemaUpdate);
    }


}
