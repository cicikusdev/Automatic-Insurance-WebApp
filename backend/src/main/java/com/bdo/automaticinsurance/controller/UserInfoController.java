package com.bdo.automaticinsurance.controller;

import com.bdo.automaticinsurance.model.UserInfo;
import com.bdo.automaticinsurance.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Angular için cors ayarı
public class UserInfoController {

    @Autowired
    private UserInfoService userInfoService;

    @PostMapping("/evaluate")
    public ResponseEntity<UserInfo> evaluateUser(@RequestBody UserInfo userInfo) {
        UserInfo result = userInfoService.evaluateCredit(userInfo);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/status")
    public ResponseEntity<String> checkStatus() {
        return ResponseEntity.ok("Service is running");
    }
}

