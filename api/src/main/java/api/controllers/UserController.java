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
        } catch (NoResultException e) {

            return null;
        } catch (Exception ex){

            ex.printStackTrace();
            return null;
        } finally {

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

//    public List<User> getUsers(List<Integer> lijst){
//        List<User> new_lijst = new ArrayList<>();
//        for(int l : lijst){
//            new_lijst.add(get(l));
//        }
//        return new_lijst;
//    }
//
//    public List<?> readAll(){
//        Session session = manager.unwrap(Session.class);
//        return session.createQuery("from User").list();
//    }
//
//    public void printUsers(List<User> users, String comment){
//        if(!users.isEmpty()) {
//            for (User u : users){
//            }
//        } else {
//
//        }
//    }
//
//    public void printFriends(List<Friend> friends, String comment){
//
//        if(!friends.isEmpty()) {
//            for (Friend f : friends){
//            }
//        } else {
//
//        }
//    }

//    public List<User> getFollowing(int id){
//        EntityTransaction action = null;
//        System.out.println(150);
//        String sql = "SELECT * FROM friend WHERE friend_id = '" + id + "'";
//        try {
//            System.out.println(151);
//            action = manager.getTransaction();
//            System.out.println(152);
//            action.begin();
//            System.out.println(153);
//            if (manager.createNativeQuery(sql, User.class) != null) {
//                System.out.println(154);
//                List<User> t = manager.createNativeQuery(sql, Friend.class).getResultList();
//                System.out.println(155);
//                action.commit();
//                System.out.println(156);
//                return t;
//            } else {
//                System.out.println(157);
//                action.rollback();
//                System.out.println(158);
//                return null;
//            }
//        } catch (Exception e){
//            System.out.println(159);
//            if(action.isActive()){
//                System.out.println(160);
//                action.rollback();
//            }
//            System.out.println(161);
//            return null;
//        }
//    }

    //    public Message update(User u){
//        EntityTransaction transaction = null;
//        try {
//            transaction = manager.getTransaction();
//            transaction.begin();
//            if(manager.find(User.class, u.getId()) != null){
//                u = manager.merge(u);
//                transaction.commit();
//                return new Message(200, "OK", "User updated", u);
//            } else {
//                transaction.rollback();
//                return new Message(404, "Not Found", "No user found with this id");
//            }
//        } catch (Exception ex){
//            if(transaction != null){
//                transaction.rollback();
//            }
//            ex.printStackTrace();
//            return new Message(500, "Internal Server Error", "User not updated");
//        }
//    }

//    public Message delete(int id){
//        EntityTransaction transaction = null;
//        try {
//            transaction = manager.getTransaction();
//            transaction.begin();
//            User u = manager.find(User.class, id);
//            manager.remove(u);
//            transaction.commit();
//            return new Message(200, "OK", "User deleted");
//        } catch (Exception ex){
//            if(transaction != null){
//                transaction.rollback();
//            }
//            ex.printStackTrace();
//            return new Message(500, "Internal Server Error", "User not deleted");
//        }
//    }


//    // GET
//    @GetMapping(value = "/user/{id}", produces = "application/json")
//    public Message returnUser(@PathVariable("id") Integer id, @RequestBody String token) {
//        if(validToken(token).getUserId() == id){
//            return get(id);
//        } else {
//            return new Message(403, "No Access", "token invalid");
//        }
//    }
//
//    // POST
//    @PostMapping(value = "/user", produces = "application/json")
//    @ResponseStatus(HttpStatus.CREATED)
//    public Message createUser(@RequestBody User newUser){
//        return create(newUser);
//    }
//
//    // PUT
//    @PutMapping(value = "/user/{id}", produces = "application/json")
//    public Message updateUser(@RequestBody User updatedUser){
//        return update(updatedUser);
//    }
//
//    // DELETE
//    @DeleteMapping(value = "/user/{id}", produces = "application/json")
//    public Message deleteUser(@PathVariable int id){
//        return delete(id);
//    }

}
