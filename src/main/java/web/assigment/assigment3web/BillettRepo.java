package web.assigment.assigment3web;

import java.util.List;

public interface BillettRepo {

   BilletterDB save(BilletterDB billetter);
   List<BilletterDB> findAll();
   List<BilletterDB> findByEtternavn(String etternavn, String fornavn);
   List<BilletterDB> findByID(String id);
   void update(BilletterDB billetter, String id);
   String deleteByID(String id);
   public int deleteByEtternavn(String etternavn);
   String deleteAlle();

}