package api;

import api.User;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Persistence;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.EntityManagerFactory;
import java.util.List;

@RestController
public class GameController {

    private static final EntityManagerFactory EMF = Persistence.createEntityManagerFactory("Memory");
    private EntityManager manager = EMF.createEntityManager();

    public GameController(){

    }

    @GetMapping(value = "/games")
    public Message welkom() {
        return readAll();
    }

    @GetMapping(value = "games/{id}")
    public Message returnGame(@PathVariable("id") Integer id) {
        return get(id);

    }

    private Message get(int id){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            if(manager.find(Game.class, id) != null){
                Game g = manager.find(Game.class, id);
                transaction.commit();
                return new Message(200, "OK", "Game found", g);
            } else {
                transaction.rollback();
                return new Message(404, "Not Found", "Game not found");
            }


        } catch (Exception e){
            if(transaction != null){
                transaction.rollback();
            }
            e.printStackTrace();
            return new Message(503, "Server Error", "Game not found");
        }
    }

//    private Message create(Game g){
//        EntityTransaction transaction = null;
//        try {
//            transaction = manager.getTransaction();
//            transaction.begin();
//            manager.persist(g);
//            transaction.commit();
//            return new Message(201, "Created", "New game created", g);
//        } catch (Exception ex){
//            if(transaction != null){
//                transaction.rollback();
//            }
//            ex.printStackTrace();
//            return new Message(500, "Internal Server Error", "Game not created");
//        }
//    }

    private Message readAll(){
        Session session = manager.unwrap(Session.class);
        List<?> gm = session.createQuery("from Game").list();
        if(!gm.isEmpty()){
            return new Message(200, "OK", "Games found", gm);
        } else {
            return new Message(204, "No Content", "0 Games found");
        }

    }

    private void printUsers(List<Game> games, String comment){
        System.out.println(comment);
        if(!games.isEmpty()) {
            for (Game g : games){
                System.out.println(g);
            }
        } else {
            System.out.println("Empty");
        }
    }

}
