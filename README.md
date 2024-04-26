
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


# Cinema Ticket Reservation System

## Overview
This system allows users to browse, book, and manage cinema tickets through a web interface and RESTful API. It is designed to provide a seamless booking experience while also allowing for backend integration with databases and other systems.

## API Endpoints

### Ticket Information
### localhost:8080
- **List All Tickets**
  - **GET** `/api/billetter/alle`
  - Retrieves a list of all booked tickets.

- **Get Ticket By ID**
  - **GET** `/api/billetter/{id}`
  - Fetches ticket details based on ticket ID.

- **Get Tickets by Surname and First Name**
  - **GET** `/api/billetter/alle_by_etternavn/{etternavn}/{fornavn}`
  - Retrieves tickets based on the customer's surname and first name.

### Ticket Management
- **Add a New Ticket**
  - **POST** `/api/billetter`
  - Creates a new ticket entry. Payload should include ticket details.

- **Update an Existing Ticket**
  - **PUT** `/api/billetter/endre/{id}`
  - Updates ticket details for the specified ticket ID.

- **Delete Ticket by Surname**
  - **DELETE** `/api/billetter/delete/{etternavn}`
  - Deletes all tickets associated with the given surname.

- **Delete All Tickets**
  - **DELETE** `/api/billetter/delete/alle`
  - Removes all tickets from the database.

- **Delete Ticket by ID**
  - **DELETE** `/api/billetter/delete/ByID/{id}`
  - Deletes a specific ticket by its ID.

## Web Routes

### Pages
- **Home Page**
  - **GET** `/kino`
  - Displays the main homepage of the cinema booking site.

- **Ticket Editing Page**
  - **GET** `/ticket/endre`
  - Page to modify an existing ticket.

- **Ticket Purchase Page**
  - **GET** `/ticket/kjop`
  - Allows users to purchase new tickets.


## Getting Started

### Prerequisites
- Java 11 or higher
- Maven 3.6 or higher


### Installation

#### Backend Setup
1. ##### Clone the repository:
   ```bash
   git clone https://github.com/AreArjane/ticket-reservation.git

2. ##### Look at youtube video for result on:
   
   
   [https://youtu.be/KkBntveXAjw]

   
## Dependency of the Project in pom.xml using Maven


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
