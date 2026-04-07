db = db.getSiblingDB("chat-demo");

db.createCollection("users");
db.createCollection("messages");