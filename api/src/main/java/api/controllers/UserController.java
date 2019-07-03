package api.controllers;

import api.tables.Friend;
import api.tables.User;

import javax.persistence.*;
import java.util.List;

//@RestController
public class UserController {

    private static final EntityManagerFactory EMF = Persistence.createEntityManagerFactory("Holidayz");
    private EntityManager manager;

    public UserController(){
        manager = EMF.createEntityManager();
    }

    public User create(User u){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            manager.persist(u);
            transaction.commit();
            return u;
        } catch (NonUniqueResultException e) {

            return null;
        } catch (Exception ex){
            ex.printStackTrace();
            return null;
        }
    }

    public int getId(String email){
        EntityTransaction action = null;
        String sql = "SELECT * FROM users WHERE email = '" + email + "'";
        try {
            action = manager.getTransaction();
            action.begin();
            Query query = manager.createNativeQuery(sql, User.class);
            if (query != null) {
                List<User> t = query.getResultList();
                action.commit();
                return t.get(0).getId();
            } else {
                action.rollback();
                return 0;
            }
        } catch (Exception e){
            if(action.isActive()){
                action.rollback();
            }
            return 0;
        }
    }

    public User get(int id){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            User u = manager.find(User.class, id);
            if(u != null){
                transaction.commit();
                return u;
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



    public void createFriend(Friend newFriend){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            manager.persist(newFriend);
            transaction.commit();
        } catch (NonUniqueResultException e) {
            e.printStackTrace();
        } catch (Exception ex){
            ex.printStackTrace();
        }
    }


    public List<User> getFollowing(int id){
        EntityTransaction action = null;
        String sql = "SELECT u.user_id, u.name, u.lastname, u.email, u.password, u.isAdmin " +
                "FROM users AS u, followers AS f " +
                "WHERE u.user_id = f.user_id AND f.friend_id = " + id;
        System.out.println(sql);
        try {
            action = manager.getTransaction();
            action.begin();
            Query query = manager.createNativeQuery(sql, User.class);
            if (query != null) {
                List<User> t = query.getResultList();
                action.commit();
                return t;
            } else {
                action.rollback();
                return null;
            }
        } catch (Exception e){
            if(action.isActive()){
                action.rollback();
            }
            return null;
        }
    }

    public List<User> getFollowers(int id){
        EntityTransaction action = null;
        String sql = "SELECT u.user_id, u.name, u.lastname, u.email, u.password, u.isAdmin " +
                "FROM users AS u, followers AS f " +
                "WHERE u.user_id = f.friend_id AND f.user_id = " + id;
        System.out.println(sql);
        try {
            action = manager.getTransaction();
            action.begin();
            Query query = manager.createNativeQuery(sql, User.class);
            if (query != null) {
                List<User> t = query.getResultList();
                action.commit();
                return t;
            } else {
                action.rollback();
                return null;
            }
        } catch (Exception e){
            if(action.isActive()){
                action.rollback();
            }
            return null;
        }
    }

    public boolean checkIfFollowing(int uid, int fid){
        EntityTransaction action = null;
        String sql = "SELECT * " +
                "FROM followers " +
                "WHERE user_id = " + uid + " AND friend_id = " + fid;
        System.out.println(sql);
        try {
            action = manager.getTransaction();
            action.begin();
            Query query = manager.createNativeQuery(sql, User.class);
            if (query != null) {
                action.commit();
                if(query.getResultList().isEmpty()){
                    return false;
                } else {
                    return true;
                }

            } else {
                action.rollback();
                return false;
            }
        } catch (Exception e){
            if(action.isActive()){
                action.rollback();
            }
            return false;
        }
    }

}
