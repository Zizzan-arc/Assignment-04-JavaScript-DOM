

## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer : getElementById is used when we have to catch something unique. It will always be unique.
        
         getElementsByClassName : Selects all items that have a specific class it returns as HTML Collection type . BEST for accessing when there are multiple items that will dynamically.

         querySelectorAll : Selects the first item that matches the CSS selector. Any css selector can be passes through querySelectorAll. It returns as NodeList and important doesnt get dynamically updated if DOM changes

### 2. How do you create and insert a new element into the DOM?

Answer : let div = document.createElement("div");
          div.innerHTML =` `; 
          And lastly we append this as a child to the parent of where we want to create this div. 
          For example : filterSection.appendChild(div);

### 3. What is Event Bubbling? And how does it work?

Answer :

### 4. What is Event Delegation in JavaScript? Why is it useful?

Answer :   It is basically a technique where instead of attaching multiple event listeners to multiple child elements , we just add an eventListener to its parent.It bubbles up to its parent

### 5. What is the difference between preventDefault() and stopPropagation() methods?
   
   Answer : stopPropagation(): It basically stops the event from bubbling up the DOM. 
     
     preventDefault() : Here basically the event bubbles up , but it stops that particular brower;s default action.

