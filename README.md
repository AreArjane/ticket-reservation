
# Cinema Ticket Reservation System

## Project Overview
This project is ticket reservation form, created with H2-database with CRUD feature.

## Features
- Welcome page
- Ticket reservation with CRUD to H2 database

## Technology Stack
- Frontend: HTML, CSS, JavaScript, Bootstrap, jQuery
- Backend: Spring Boot, Java
- Database: H2-database SQL

## Getting Started

### Prerequisites
- Java 11 or higher
- Maven 3.6 or higher

### Dependencies
- spring-boot-devtools
-  spring-boot-starter-data-jdbc
-  spring-boot-starter-data-jpa
-   spring-boot-starter-web
-    spring-boot-devtools
- spring-boot-starter-thymeleaf
-  spring-boot-starter-test
### Installation

#### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cinema-ticket-system.git](https://github.com/AreArjane/ticket-reservation.git

/cinema-ticket-system
|-- /src
|   |-- /main
|   |   |-- /java
|   |   |   |-- /com
|   |   |       |-- /cinema
|   |   |           |-- /controller
|   |   |           |-- /service
|   |   |           |-- /repository
|   |   |-- /resources
|   |       |-- /templates
|   |       |-- /static
|-- /frontend
|   |-- /src
|   |-- /public
|-- pom.xml
|-- README.md



```xml
<!-- Spring Boot Devtools -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>

<!-- Spring Data JDBC -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jdbc</artifactId>
</dependency>

<!-- Spring Data JPA -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- Spring Web -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Thymeleaf -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>

<!-- Spring Boot Starter Test -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
