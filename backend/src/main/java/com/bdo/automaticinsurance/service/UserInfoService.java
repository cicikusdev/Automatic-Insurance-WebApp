package com.bdo.automaticinsurance.service;

import com.bdo.automaticinsurance.model.UserInfo;
import com.bdo.automaticinsurance.repository.UserInfoRepository;
import org.camunda.bpm.engine.DecisionService;
import org.camunda.bpm.engine.variable.Variables;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserInfoService {
    private static final Logger logger = LoggerFactory.getLogger(UserInfoService.class);

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private DecisionService decisionService;

    public UserInfo evaluateCredit(UserInfo userInfo) {
        try {
            logger.info("Evaluating insurance application for user data: {}", userInfo);

            // Input validation to prevent null values
            validateUserInput(userInfo);

            // Kullanıcının girdiği cevapları DMN tablosuna gönderiyoruz
            Map<String, Object> variables = Variables.createVariables()
                    .putValue("yas", userInfo.getYas())
                    .putValue("saglik", userInfo.getSaglik())
                    .putValue("meslek", userInfo.getMeslek())
                    .putValue("gelir", userInfo.getGelir())
                    .putValue("sigara", userInfo.getSigara())
                    .putValue("alkol", userInfo.getAlkol())
                    .putValue("gecmis", userInfo.getGecmis())
                    .putValue("medeni", userInfo.getMedeni())
                    .putValue("malvarligi", userInfo.getMalvarligi());

            logger.debug("DMN input variables: {}", variables);

            // Try to evaluate the decision table
            var evaluationResult = decisionService.evaluateDecisionTableByKey("automatic_insurance", variables);

            if (evaluationResult == null) {
                logger.error("DMN evaluation returned null result");
                throw new RuntimeException("DMN evaluation failed, no result returned");
            }

            var singleResult = evaluationResult.getSingleResult();

            if (singleResult == null) {
                logger.error("DMN evaluation returned no single result");
                throw new RuntimeException("DMN kararı bulunamadı.");
            }

            var singleEntry = singleResult.getSingleEntry();

            if (singleEntry == null) {
                logger.error("DMN evaluation has no single entry in result");
                throw new RuntimeException("DMN decision has no entry");
            }

            String decisionResult = singleEntry.toString();
            logger.info("DMN decision result: {}", decisionResult);

            // Kararı kaydediyoruz
            userInfo.setKrediSonucu(decisionResult);

            // Database'e kaydet ve döndür
            UserInfo savedInfo = userInfoRepository.save(userInfo);
            logger.info("Insurance application saved with ID: {}, decision: {}", savedInfo.getId(), savedInfo.getKrediSonucu());
            return savedInfo;

        } catch (Exception e) {
            logger.error("Error in evaluateCredit:", e);
            throw new RuntimeException("Error evaluating insurance application: " + e.getMessage(), e);
        }
    }

    private void validateUserInput(UserInfo userInfo) {
        // Set default values for any null fields to prevent DMN evaluation errors
        if (userInfo.getYas() == null) userInfo.setYas("30");
        if (userInfo.getSaglik() == null) userInfo.setSaglik("Average");
        if (userInfo.getMeslek() == null) userInfo.setMeslek("Other");
        if (userInfo.getGelir() == null) userInfo.setGelir("10000");
        if (userInfo.getSigara() == null) userInfo.setSigara("No");
        if (userInfo.getAlkol() == null) userInfo.setAlkol("No");
        if (userInfo.getGecmis() == null) userInfo.setGecmis("Clean");
        if (userInfo.getMedeni() == null) userInfo.setMedeni("Single");
        if (userInfo.getMalvarligi() == null) userInfo.setMalvarligi("None");
    }
}