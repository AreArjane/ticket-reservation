package web.assigment.assigment3web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billetter")
public class HomeController {
    @Autowired
    private HomeRepository homeRepo;

    @GetMapping("/alle")
    public List<BilletterDB> getBilletters() {
        return homeRepo.findAll();
    }
    @GetMapping("{id}")
    public List<BilletterDB> getBilletterById(@PathVariable String id) {
        return homeRepo.findByID(id);
    }

    @GetMapping("/alle_by_etternavn/{etternavn}/{fornavn}")
    public List<BilletterDB> getbyEtternavn(@PathVariable String etternavn, @PathVariable String fornavn) {
        return homeRepo.findByEtternavn(etternavn, fornavn);
    }
    @GetMapping("/endre/endre_ticket")
    public String endre_ticket() {
        return "endre_ticket";
    }
    @PostMapping
    public BilletterDB liggeB(@RequestBody BilletterDB billett) {
        return homeRepo.save(billett);
    }


    @PutMapping("/endre/{id}")
    public void updateB(BilletterDB billetter, @PathVariable String id) {
        billetter.setId(id);
        homeRepo.update(billetter, id);
    }

    @DeleteMapping("/delete/{etternavn}")
    public int deleteEtter(@PathVariable String etternavn) {
        return homeRepo.deleteByEtternavn(etternavn);
    }
    @DeleteMapping("/delete/alle")
    public String deleteAllBillett() {
        return homeRepo.deleteAlle();
    }
    @DeleteMapping("/delete/ByID/{id}")
    public String deleteB(@PathVariable String id) {
        return homeRepo.deleteByID(id);
    }

}
