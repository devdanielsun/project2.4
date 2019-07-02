package api;

import org.hibernate.Session;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.List;

public class Meen {
    private static final EntityManagerFactory EMF = Persistence.createEntityManagerFactory("Memory");
    private EntityManager manager;

//    public static void main(String args[]){
//        Meen m = new Meen();
//        m.Draai();
//    }

    public void Draai(){
        manager = EMF.createEntityManager();

        //User usr1 = new User("henk", "henk@henk.com", "g3h31m");
        //User usr2 = new User("mier","mier@insect.com","M13R");

        //Game gm1 = new Game("geheugen","geheugen.co.uk","ZYXWV");
        //Game gm2 = new Game("ram","??.be","foetsie");

        //create(usr1);
        //create(usr2);

        printUsers(readAll(), "lijstje met studenten hopelijk");
    }


    public void create(User u){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            manager.persist(u);
            transaction.commit();
        } catch (Exception ex){
            if(transaction != null){
                transaction.rollback();
            }
            ex.printStackTrace();
        }
    }

    public void delete(int id){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            User u = manager.find(User.class, id);
            manager.remove(u);
            transaction.commit();
        } catch (Exception ex){
            if(transaction != null){
                transaction.rollback();
            }
            ex.printStackTrace();
        }
    }

    public void update(User u){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            u = manager.merge(u);
            manager.remove(u);
            transaction.commit();
        } catch (Exception ex){
            if(transaction != null){
                transaction.rollback();
            }
            ex.printStackTrace();
        }
    }

    public List<User> readAll(){
        Session session = manager.unwrap(Session.class);
        return session.createQuery("from User").list();
    }

    public void printUsers(List<User> users, String comment){
        System.out.println(comment);
        if(!users.isEmpty()) {
            for (User u : users){
                System.out.println(u);
            }
        } else {
            System.out.println("Empty");
        }
    }
}
