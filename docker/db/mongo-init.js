db = db.getSiblingDB("chat-demo");

db.createCollection("users");
db.createCollection("messages");
db.createCollection("conversations");
db.createCollection("friendRequests");