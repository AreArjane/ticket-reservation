package web.assigment.assigment3web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HomeRepository implements BillettRepo {
    @Autowired
    private JdbcTemplate db;

    private RowMapper<BilletterDB> rowMapper = (rs, rowNum) -> {
        BilletterDB billett = new BilletterDB();

        billett.setId(rs.getString("id"));
        billett.setFornavn(rs.getString("fornavn"));
        billett.setEtternavn(rs.getString("etternavn"));
        billett.setTelefon(rs.getString("telefon"));
        billett.setEmail(rs.getString("email"));
        billett.setFilm(rs.getString("film"));
        billett.setAntall(rs.getInt("antall"));
        return billett;
    };



    @Override
    public BilletterDB save(BilletterDB billetter) {
        db.update("INSERT INTO Billetter (id, etternavn, antall, email, film, fornavn, telefon) VALUES(?,?,?,?,?,?,?)",
                billetter.getId(),billetter.getEtternavn(), billetter.getAntall(), billetter.getEmail(), billetter.getFilm(), billetter.getFornavn(), billetter.getTelefon());
        return billetter;
    }

    @Override
    public List<BilletterDB> findAll() {
        return db.query("SELECT * FROM Billetter", rowMapper);
    }
    @Override
    public List<BilletterDB> findByEtternavn(String etternavn, String fornavn) {
        return db.query("SELECT * FROM Billetter WHERE etternavn = ? AND fornavn = ?", new Object[]{etternavn, fornavn}, rowMapper);
    }

    @Override
    public void update(BilletterDB billetter, String id) {
            db.update("UPDATE Billetter SET fornavn=?, etternavn =?, telefon=?, film=?, antall=? WHERE id=? ",
                    billetter.getFornavn(), billetter.getEtternavn(), billetter.getTelefon(), billetter.getFilm(), billetter.getAntall(), id);
    }

    @Override
    public int  deleteByEtternavn(String etternavn) {
        return db.update("DELETE FROM Billetter WHERE etternavn = ?", etternavn);
    }
    @Override
    public String  deleteByID(String id) {
         db.update("DELETE FROM Billetter WHERE id = ?", id);
         return "Id er slettet";

    }

    @Override
    public String deleteAlle(){
          db.update("DELETE FROM Billetter");
          return "Alle billetter er slettet";

    }
    @Override
    public List<BilletterDB>  findByID(String id){
        return db.query("SELECT * FROM Billetter WHERE id=?", new Object[]{id}, rowMapper);
    }
}
