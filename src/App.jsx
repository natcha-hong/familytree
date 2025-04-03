// // App.jsx
// import React, { useState } from 'react';

// class Person {
//   constructor(name, birthdate, details = {}) {
//     this.name = name;
//     this.birthdate = birthdate;
//     this.details = details;
//     this.parents = [];
//     this.children = [];
//   }

//   addParent(parent) {
//     this.parents.push(parent);
//   }

//   addChild(child) {
//     this.children.push(child);
//   }

//   updateDetails(details) {
//     this.details = { ...this.details, ...details };
//   }

//   toString() {
//     return `${this.name} (Born: ${this.birthdate}, Details: ${JSON.stringify(this.details)})`;
//   }
// }

// class FamilyTree {
//   constructor() {
//     this.people = {};
//   }

//   addPerson(person) {
//     this.people[person.name] = person;
//   }

//   addRelationship(parentName, childName) {
//     if (this.people[parentName] && this.people[childName]) {
//       const parent = this.people[parentName];
//       const child = this.people[childName];
//       parent.addChild(child);
//       child.addParent(parent);
//     } else {
//       console.log("Person not found in the family tree.");
//     }
//   }

//   updatePersonDetails(personName, details) {
//     if (this.people[personName]) {
//       this.people[personName].updateDetails(details);
//     } else {
//       console.log("Person not found in the family tree.");
//     }
//   }

//   displayDescendants(personName) {
//     if (this.people[personName]) {
//       const person = this.people[personName];
//       return this._displayDescendantsRecursive(person, 0);
//     } else {
//       console.log("Person not found in the family tree.");
//       return [];
//     }
//   }

//   _displayDescendantsRecursive(person, level) {
//     const descendants = [`${"  ".repeat(level)}${person.name}`];
//     for (const child of person.children) {
//       descendants.push(...this._displayDescendantsRecursive(child, level + 1));
//     }
//     return descendants;
//   }
// }

// const UserCard = ({ person }) => {
//   return (
//     <div className="user-card">
//       <h2>{person.name}</h2>
//       <p>Birthdate: {person.birthdate}</p>
//       <p>Details: {JSON.stringify(person.details)}</p>
//     </div>
//   );
// };

// function App() {
//   const [familyTree, setFamilyTree] = useState(new FamilyTree());
//   const [descendants, setDescendants] = useState([]);
//   const [personName, setPersonName] = useState('');
//   const [newPerson, setNewPerson] = useState({ name: '', birthdate: '', details: {} });
//   const [relationship, setRelationship] = useState({ parent: '', child: '' });
//   const [updatePerson, setUpdatePerson] = useState({ name: '', details: {} });
//   const [peopleList, setPeopleList] = useState([]);

//   const createFamilyTree = () => {
//     const newFamilyTree = new FamilyTree();

//     const john = new Person("John Doe", "January 1st, 1980", { gender: "Male" });
//     const jane = new Person("Jane Doe", "March 15th, 1982", { gender: "Female", spouse: "John Doe" });
//     const alex = new Person("Alex Doe", "May 20th, 2005", { gender: "Male" });
//     const emily = new Person("Emily Doe", "October 10th, 2008", { gender: "Female" });
//     const sarah = new Person("Sarah Doe", "January 5th, 2025", { gender: "Female" });
//     const michael = new Person("Michael Doe", "February 12th, 2026", { gender: "Male" });

//     newFamilyTree.addPerson(john);
//     newFamilyTree.addPerson(jane);
//     newFamilyTree.addPerson(alex);
//     newFamilyTree.addPerson(emily);
//     newFamilyTree.addPerson(sarah);
//     newFamilyTree.addPerson(michael);

//     newFamilyTree.addRelationship("John Doe", "Alex Doe");
//     newFamilyTree.addRelationship("Jane Doe", "Alex Doe");
//     newFamilyTree.addRelationship("John Doe", "Emily Doe");
//     newFamilyTree.addRelationship("Jane Doe", "Emily Doe");
//     newFamilyTree.addRelationship("Alex Doe", "Sarah Doe");
//     newFamilyTree.addRelationship("Alex Doe", "Michael Doe");

//     newFamilyTree.updatePersonDetails("John Doe", { occupation: "Engineer" });

//     setFamilyTree(newFamilyTree);
//     setPeopleList(Object.values(newFamilyTree.people));
//   };

//   const handleDisplayDescendants = () => {
//     const result = familyTree.displayDescendants(personName);
//     setDescendants(result);
//   };

//   const handleAddPerson = () => {
//     const person = new Person(newPerson.name, newPerson.birthdate, newPerson.details);
//     familyTree.addPerson(person);
//     setNewPerson({ name: '', birthdate: '', details: {} });
//     setPeopleList(Object.values(familyTree.people));
//   };

//   const handleAddRelationship = () => {
//     familyTree.addRelationship(relationship.parent, relationship.child);
//     setRelationship({ parent: '', child: '' });
//     setPeopleList(Object.values(familyTree.people));
//   };

//   const handleUpdatePerson = () => {
//     familyTree.updatePersonDetails(updatePerson.name, updatePerson.details);
//     setUpdatePerson({ name: '', details: {} });
//     setPeopleList(Object.values(familyTree.people));
//   };

//   return (
//     <div className="app-container">
//       <h1>Family Tree</h1>

//       <button onClick={createFamilyTree}>Create Family Tree</button>

//       <div>
//         <h2>Add Person</h2>
//         <input placeholder="Name" value={newPerson.name} onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })} />
//         <input placeholder="Birthdate" value={newPerson.birthdate} onChange={(e) => setNewPerson({ ...newPerson, birthdate: e.target.value })} />
//         <input placeholder="Details (JSON)" value={JSON.stringify(newPerson.details)} onChange={(e) => setNewPerson({ ...newPerson, details: JSON.parse(e.target.value) })} />
//         <button onClick={handleAddPerson}>Add Person</button>
//       </div>

//       <div>
//         <h2>Add Relationship</h2>
//         <input placeholder="Parent Name" value={relationship.parent} onChange={(e) => setRelationship({ ...relationship, parent: e.target.value })} />
//         <input placeholder="Child Name" value={relationship.child} onChange={(e) => setRelationship({ ...relationship, child: e.target.value })} />
//         <button onClick={handleAddRelationship}>Add Relationship</button>
//       </div>

//       <div>
//         <h2>Update Person Details</h2>
//         <input placeholder="Person Name" value={updatePerson.name} onChange={(e) => setUpdatePerson({ ...updatePerson, name: e.target.value })} />
//         <input placeholder="Update Details (JSON)" value={JSON.stringify(updatePerson.details)} onChange={(e) => setUpdatePerson({ ...updatePerson, details: JSON.parse(e.target.value) })} />
//         <button onClick={handleUpdatePerson}>Update Details</button>
//       </div>

//       <div>
//         <input placeholder="Person Name" value={personName} onChange={(e) => setPersonName(e.target.value)} />
//         <button onClick={handleDisplayDescendants}>Display Descendants</button>
//       </div>

//       <div className="user-list">
//         {peopleList.map((person) => (
//           <UserCard key={person.name} person={person} />
//         ))}
//       </div>

//       <div>
//         {descendants.map((descendant, index) => (
//           <p key={index}>{descendant}</p>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;


// App.jsx
import React, { useState } from 'react';

class Person {
  constructor(name, birthdate, details = {}) {
    this.name = name;
    this.birthdate = birthdate;
    this.details = details;
    this.parents = [];
    this.children = [];
  }

  addParent(parent) {
    this.parents.push(parent);
  }

  addChild(child) {
    this.children.push(child);
  }

  updateDetails(details) {
    this.details = { ...this.details, ...details };
  }

  toString() {
    return `${this.name} (Born: ${this.birthdate}, Details: ${JSON.stringify(this.details)})`;
  }
}

class FamilyTree {
  constructor() {
    this.people = {};
  }

  addPerson(person) {
    this.people[person.name] = person;
  }

  addRelationship(parentName, childName) {
    if (this.people[parentName] && this.people[childName]) {
      const parent = this.people[parentName];
      const child = this.people[childName];
      parent.addChild(child);
      child.addParent(parent);
    } else {
      console.log("Person not found in the family tree.");
    }
  }

  updatePersonDetails(personName, details) {
    if (this.people[personName]) {
      this.people[personName].updateDetails(details);
    } else {
      console.log("Person not found in the family tree.");
    }
  }

  displayDescendants(personName) {
    if (this.people[personName]) {
      const person = this.people[personName];
      return this._displayDescendantsRecursive(person, 0);
    } else {
      console.log("Person not found in the family tree.");
      return [];
    }
  }

  _displayDescendantsRecursive(person, level) {
    const descendants = [`${"  - ".repeat(level)}${person.name}`];
    for (const child of person.children) {
      descendants.push(...this._displayDescendantsRecursive(child, level + 1));
    }
    return descendants;
  }
}

const UserCard = ({ person }) => {
  return (
    <div className="user-card">
      <h2>{person.name}</h2>
      <p>Birthdate: {person.birthdate}</p>
      <p>Details: {JSON.stringify(person.details)}</p>
    </div>
  );
};

function App() {
  const [familyTree, setFamilyTree] = useState(new FamilyTree());
  const [descendants, setDescendants] = useState([]);
  const [personName, setPersonName] = useState('');
  const [newPerson, setNewPerson] = useState({ name: '', birthdate: '', details: {} });
  const [relationship, setRelationship] = useState({ parent: '', child: '' });
  const [updatePerson, setUpdatePerson] = useState({ name: '', details: {} });
  const [peopleList, setPeopleList] = useState([]);

  const createFamilyTree = () => {
    const newFamilyTree = new FamilyTree();

    const john = new Person("John Doe", "January 1st, 1980", { gender: "Male" });
    const jane = new Person("Jane Doe", "March 15th, 1982", { gender: "Female", spouse: "John Doe" });
    const alex = new Person("Alex Doe", "May 20th, 2005", { gender: "Male" });
    const emily = new Person("Emily Doe", "October 10th, 2008", { gender: "Female" });
    const sarah = new Person("Sarah Doe", "January 5th, 2025", { gender: "Female" });
    const michael = new Person("Michael Doe", "February 12th, 2026", { gender: "Male" });

    newFamilyTree.addPerson(john);
    newFamilyTree.addPerson(jane);
    newFamilyTree.addPerson(alex);
    newFamilyTree.addPerson(emily);
    newFamilyTree.addPerson(sarah);
    newFamilyTree.addPerson(michael);

    newFamilyTree.addRelationship("John Doe", "Alex Doe");
    newFamilyTree.addRelationship("Jane Doe", "Alex Doe");
    newFamilyTree.addRelationship("John Doe", "Emily Doe");
    newFamilyTree.addRelationship("Jane Doe", "Emily Doe");
    newFamilyTree.addRelationship("Alex Doe", "Sarah Doe");
    newFamilyTree.addRelationship("Alex Doe", "Michael Doe");

    newFamilyTree.updatePersonDetails("John Doe", { occupation: "Engineer" });

    setFamilyTree(newFamilyTree);
    setPeopleList(Object.values(newFamilyTree.people));
  };

  const handleDisplayDescendants = () => {
    const result = familyTree.displayDescendants(personName);
    setDescendants(result);
  };

  const handleAddPerson = () => {
    const person = new Person(newPerson.name, newPerson.birthdate, newPerson.details);
    familyTree.addPerson(person);
    setNewPerson({ name: '', birthdate: '', details: {} });
    setPeopleList(Object.values(familyTree.people));
  };

  const handleAddRelationship = () => {
    familyTree.addRelationship(relationship.parent, relationship.child);
    setRelationship({ parent: '', child: '' });
    setPeopleList(Object.values(familyTree.people));
  };

  const handleUpdatePerson = () => {
    familyTree.updatePersonDetails(updatePerson.name, updatePerson.details);
    setUpdatePerson({ name: '', details: {} });
    setPeopleList(Object.values(familyTree.people));
  };

  return (
    <div className="app-container">
      <h1>Family Tree</h1>

      <button onClick={createFamilyTree}>Create Family Tree</button>

      <div>
        <h2>Add Person</h2>
        <input placeholder="Name" value={newPerson.name} onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })} />
        <input placeholder="Birthdate" value={newPerson.birthdate} onChange={(e) => setNewPerson({ ...newPerson, birthdate: e.target.value })} />
        <input placeholder="Details (JSON)" value={JSON.stringify(newPerson.details)} onChange={(e) => setNewPerson({ ...newPerson, details: JSON.parse(e.target.value) })} />
        <button onClick={handleAddPerson}>Add Person</button>
      </div>

      <div>
        <h2>Add Relationship</h2>
        <input placeholder="Parent Name" value={relationship.parent} onChange={(e) => setRelationship({ ...relationship, parent: e.target.value })} />
        <input placeholder="Child Name" value={relationship.child} onChange={(e) => setRelationship({ ...relationship, child: e.target.value })} />
        <button onClick={handleAddRelationship}>Add Relationship</button>
      </div>

      <div>
        <h2>Update Person Details</h2>
        <input placeholder="Person Name" value={updatePerson.name} onChange={(e) => setUpdatePerson({ ...updatePerson, name: e.target.value })} />
        <input placeholder="Update Details (JSON)" value={JSON.stringify(updatePerson.details)} onChange={(e) => setUpdatePerson({ ...updatePerson, details: JSON.parse(e.target.value) })} />
        <button onClick={handleUpdatePerson}>Update Details</button>
      </div>

      <div>
        <input placeholder="Person Name" value={personName} onChange={(e) => setPersonName(e.target.value)} />
        <button onClick={handleDisplayDescendants}>Display Descendants</button>
      </div>

      <div className="user-list">
        {peopleList.map((person) => (
          <UserCard key={person.name} person={person} />
        ))}
      </div>

      <div>
        {descendants.map((descendant, index) => (
          <p key={index}>{descendant}</p>
        ))}
      </div>
    </div>
  );
}

export default App;