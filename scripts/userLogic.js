class User {
    static lastId = 0;
    constructor(name, email) {
      User.lastId++;
      this.id = `U${String(User.lastId).padStart(3, '0')}`;
      this.name = name;
      this.email = email;
      if (this.constructor === User) {
        throw new Error("Abstract classes can't be instantiated.");
      }
    }
  
    getRole() {
      throw new Error("Method 'getRole()' must be implemented.");
    }
  
    getId() {
      return this.id;
    }
  
    getName() {
      return this.name;
    }
  
    getEmail() {
      return this.email;
    }
  
    displayInfo() {
      throw new Error("Method 'displayInfo()' must be implemented.");
    }
  }
  
  class Customer extends User {
    constructor(name, email, loyaltyPoints = 0) {
      super(name, email);
      this.loyaltyPoints = loyaltyPoints;
    }
  
    getRole() {
      return 'Customer';
    }
  
    getLoyaltyPoints() {
      return this.loyaltyPoints;
    }
  
    addLoyaltyPoints(points) {
      this.loyaltyPoints += points;
    }
  
    displayInfo() {
      console.log(`Customer: ${this.name}, Email: ${this.email}, Loyalty Points: ${this.loyaltyPoints}`);
    }
  }
  
  class Seller extends User {
    constructor(name, email, products = []) {
      super(name, email);
      this.products = products;
    }
  
    getRole() {
      return 'Seller';
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(product) {
      this.products.push(product);
    }
  
    displayInfo() {
      console.log(`Seller: ${this.name}, Email: ${this.email}, Products: ${this.products.join(', ')}`);
    }
  }
  
  class Admin extends User {
    constructor(name, email, accessLevel = 1) {
      super(name, email);
      this.accessLevel = accessLevel;
    }
  
    getRole() {
      return 'Admin';
    }
  
    getAccessLevel() {
      return this.accessLevel;
    }
  
    setAccessLevel(level) {
      this.accessLevel = level;
    }
  
    displayInfo() {
      console.log(`Admin: ${this.name}, Email: ${this.email}, Access Level: ${this.accessLevel}`);
    }
  }
  
 
  
  customer.displayInfo();
  seller.displayInfo();
  admin.displayInfo();
  
  
  
  