package web.assigment.assigment3web;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name ="Billetter")
public class BilletterDB {

    @Column(name = "etternavn")
    private String etternavn;

    @Column(name = "fornavn")
    private String fornavn;

    @Column(name = "telefon")
    private String telefon;

    @Column(name = "email")
    private String email;

    @Column(name = "film")
    private String film;

    @Column(name = "antall")
    private int antall;
    @Id
    private String id;

    public BilletterDB() {
        this.id = UUID.randomUUID().toString();
    }
    public void setId(String id) {
        this.id = id;
    }
    public void setFornavn(String fornavn) {
        this.fornavn = fornavn;
    }
    public void setEtternavn(String etternavn) {
        this.etternavn = etternavn;
    }
    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setFilm(String film) {
        this.film = film;
    }
    public void setAntall(int antall) {
        this.antall = antall;
    }
    public String getFornavn() {
        return fornavn;
    }
    public String getEtternavn() {
        return etternavn;
    }
    public String getTelefon() {
        return telefon;
    }
    public String getEmail() {
        return email;
    }
    public String getFilm() {
        return film;
    }
    public int getAntall() {
        return antall;
    }
    public String getId() {
        return id;
    }
}