# 🛡️ Automatic Insurance Evaluation System with DMN & FEEL

This project presents a **rule-based automatic insurance assessment system** developed within the _Formal Languages and Automata_ course at **Eskişehir Osmangazi University**, Department of Computer Engineering (Spring 2024–2025).

The system leverages **Decision Model and Notation (DMN)** and **FEEL (Friendly Enough Expression Language)** to determine insurance eligibility based on a user’s personal data such as age, health status, income level, and more.

---

## 📌 Project Summary

The aim of this project is to automate the **insurance application evaluation process** by reducing human error and speeding up decision-making. Through a step-by-step form interface, the system collects user data and processes it using a DMN decision engine enhanced with FEEL expressions.

The outcome is a personalized insurance decision: **Approved**, **Special Case**, or **Rejected**.

---

## ⚙️ Technologies Used

### 🔸 Frontend

- Angular (TypeScript-based framework)
- Angular Material (for UI components)

### 🔸 Backend

- Spring Boot (Java-based backend framework)
- Spring Data JPA (for database communication)
- PostgreSQL (relational database)

### 🔸 Decision Engine & Tools

- Camunda DMN Engine
- Camunda Modeler
- Docker

### 🔸 Mobile App (iOS prototype)

- Swift & SwiftUI
- Alamofire
- Core Data / Realm
- Xcode

---

## 🧠 Formal Modeling (DFA Representation)

The decision logic is also represented as a **Deterministic Finite Automaton (DFA)** with:

- **Σ (Alphabet):** includes user inputs like age ranges, health conditions, income brackets, etc.
- **Q (States):** from `start` to various decision points
- **δ (Transition Function):** maps user input to next decision state
- **F (Final States):** either `Accepted`, `Special`, or `Rejected`

---

## 🛠️ Project Architecture

- **Frontend** collects user input via multiple-choice questions.
- **Backend** processes the data with Camunda DMN engine and FEEL rules.
- **Decision Tables** are interconnected to simulate a multi-stage evaluation process.
- **Results** are sent back to the user with a final insurance recommendation.

---

## 👨‍👩‍👧‍👦 Team

| Name              | Student ID   | Role                                   | Effort (Man-hours) |
| ----------------- | ------------ | -------------------------------------- | ------------------ |
| Umay Ece MANTAR   | 152120221127 | Frontend, Backend Optimization, Report | 50 h               |
| Berivan KORLAELÇİ | 152120181019 | Backend Development, DMN Tables        | 40 h               |
| Metehan DOĞAN     | 151220192033 | Database Design, Jira Management       | 40 h               |
| İsmail Can DURAK  | 152120181126 | Mobile App Development                 | 45 h               |

---

## 📆 Project Milestones

- ✅ Topic Selection and Research
- ✅ Parameter Design & Database Setup
- ✅ DMN Table & FEEL Logic Construction
- ✅ Frontend & Backend Implementation
- ✅ Mobile Prototype Design
- ✅ Final Integration & Presentation

---

## 🔗 Repository

**GitHub Link:** [https://github.com/berivankorlaelci/automatic_insurance](https://github.com/berivankorlaelci/automatic_insurance)

---

## 📚 References

- [DMN Specification – OMG](https://www.omg.org/spec/DMN/)
- [Camunda Documentation](https://docs.camunda.org/manual/latest/reference/dmn/)
- [FEEL Handbook](https://kiegroup.github.io/dmn-feel-handbook/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Swift Language Docs](https://developer.apple.com/documentation/swift/)
