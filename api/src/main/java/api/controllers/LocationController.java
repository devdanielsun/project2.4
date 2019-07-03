package api.controllers;

import api.config;
import api.tables.Location;
//import org.hibernate.HibernateException;
import api.tables.User;
import com.sun.prism.shader.Solid_TextureYV12_AlphaTest_Loader;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.annotations.Table;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import javax.persistence.TypedQuery;
import javax.persistence.Persistence;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.EntityManagerFactory;
//import javax.ws.rs.core.Response;
import java.util.List;

import static api.controllers.TokenController.validToken;

public class LocationController {

    private static final EntityManagerFactory EMF = Persistence.createEntityManagerFactory("Holidayz");
    private EntityManager manager;


    public LocationController(){
        manager = EMF.createEntityManager();
    }


    public Location create(Location l){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            manager.clear();
            transaction.begin();
            manager.persist(l);
            transaction.commit();
            //return new Message(201, "Created", "New location created", l);
            return l;
        } catch (RuntimeException re) {
            transaction.rollback();
            throw re;
        } catch (Exception ex){
            if(transaction != null || transaction.isActive()){
                transaction.rollback();
            }
            ex.printStackTrace();
            //return new Message(500, "Internal Server Error", "Location not created");
            return null;
        }
    }



    public List<Location> get(int id){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            String sql = "\n SELECT * FROM maps WHERE user_id = "+id+"\n";
            if(manager.createNativeQuery(sql, Location.class) != null){
                List<Location> t = manager.createNativeQuery(sql, Location.class).getResultList();
                transaction.commit();
                return t;
            } else {
                transaction.rollback();
                return null;
            }


        } catch (Exception e){
            if(transaction != null){
                transaction.rollback();
            }
            e.printStackTrace();
            return null;
        }
    }


}
