package api;

import api.Topscore;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

//import javax.persistence.TypedQuery;
import javax.persistence.Persistence;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.EntityManagerFactory;
import javax.ws.rs.core.Response;
import java.util.List;

@RestController
public class ScoreController {

    private static final EntityManagerFactory EMF = Persistence.createEntityManagerFactory("Memory");
    private EntityManager manager;

    public ScoreController(){
        manager = EMF.createEntityManager();
    }

    @GetMapping(value = "/myscore")
    public String welkom() {
        return "dit is de pagina /myscore";
    }

    @GetMapping(value = "myscores/{id}", produces = "application/json")
    public Message returnTopscore(@PathVariable("id") Integer id) {
        return getTopScore(id);

    }

    @GetMapping(value = "topscores/{id}", produces = "application/json")
    public Message returnScore(@PathVariable("id") Integer id) {
        return getMyScore(id);

    }

    @PostMapping(value = "/myscores", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Message createScore(@RequestBody Topscore newScore){
        return create(newScore);
    }

    private Message create(Topscore t){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            manager.persist(t);
            transaction.commit();
            return new Message(201, "Created", "New score created", t);
        } catch (Exception ex){
            if(transaction != null){
                transaction.rollback();
            }
            ex.printStackTrace();
            return new Message(500, "Internal Server Error", "Score not created");
        }
    }

    private Message getTopScore(int id){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            String sql = "\n SELECT * FROM topscores WHERE user_id = "+id+"\n";
            if(manager.createNativeQuery(sql, Topscore.class) != null){
                //System.out.println(sql);
            //if(manager.find(Topscore.class, id) != null){
                List<Topscore> t = manager.createNativeQuery(sql, Topscore.class).getResultList();
                //Topscore t = manager.find(Topscore.class, id);
                transaction.commit();
                return new Message(200, "OK", "Score found", t);
            } else {
                transaction.rollback();
                return new Message(404, "Not Found", "Score not found");
            }


        } catch (Exception e){
            if(transaction != null){
                transaction.rollback();
            }
            e.printStackTrace();
            return new Message(503, "Server Error", "Score not found");
        }
    }

    private Message getMyScore(int id){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            String sql = "\n SELECT * FROM topscores WHERE game_id = "+id+"\n";
            if(manager.createNativeQuery(sql, Topscore.class) != null){
                //System.out.println(sql);
                //if(manager.find(Topscore.class, id) != null){
                List<Topscore> t = manager.createNativeQuery(sql, Topscore.class).getResultList();
                //Topscore t = manager.find(Topscore.class, id);
                transaction.commit();
                return new Message(200, "OK", "Score found", t);
            } else {
                transaction.rollback();
                return new Message(404, "Not Found", "Score not found");
            }


        } catch (Exception e){
            if(transaction != null){
                transaction.rollback();
            }
            e.printStackTrace();
            return new Message(503, "Server Error", "Score not found");
        }
    }

    private List<?> readAll(){
        Session session = manager.unwrap(Session.class);
        return session.createQuery("from Score").list();
    }

    private void printScores(List<Topscore> topscores, String comment){
        System.out.println(comment);
        if(!topscores.isEmpty()) {
            for (Topscore t : topscores){
                System.out.println(t);
            }
        } else {
            System.out.println("Empty");
        }
    }

}
