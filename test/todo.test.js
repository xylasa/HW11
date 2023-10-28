const app = require("../app.js")
const request = require('supertest');
const {sequelize} = require("../models");
const {queryInterface} = sequelize;


// CODE SEBELUM TESTING
// ==> BULK INSERT / POPULATE DATA

beforeAll((done) => {

    queryInterface.bulkInsert("Todos", [
        {
          id: 999991,
          title: 'Membuat Project', 
          createdAt: new Date(),
          updatedAt: new Date()
     },
     { 
         id: 999992,
         title: 'Belajar Sequelize', 
         createdAt: new Date(),
          updatedAt: new Date()
     },
     {
         id: 999993,
         title: 'Mengerjakan Homework',
         createdAt: new Date(),
          updatedAt: new Date()
      }

    ], {})
    .then(_ => {
      done()
  })
  .catch(err => {
      done(err)
  }) 
})

// CODE SETELAH TESTING SELESAI
// CLEANING DATABASE / HAPUS SEMUA DATA DI TABLE GAMES

afterAll((done) => {

  queryInterface.bulkDelete("Todos", null, {})
      .then(_ => {
          done()
      })
      .catch(err => {
          done(err)
      })
})

// UNIT TESTING / TEST DRIVEN DEVELOPMENT
// TEST SETIAfP ENDPOINT YANG DIBUAT

describe("GET /todos", () => {

  it("Get list todos", (done) => {
      
      request(app)
          .get("/todos")
          .expect('Content-Type', /json/)
          .expect(200)
          .then((res) => {
            const todos = res.body;
            expect(todos.length).toBe(3)
            const firstTodos = todos[0]

            expect(firstTodos.title).toEqual("Membuat Project")
            expect(firstTodos.id).toEqual(999991)
            done();

          })
          .catch(err => {
            done(err);
        })

  })


})

describe("GET /Todos/:id", () => {

  it("Get Todos Detail", (done) => {
    request(app)
    .get(`/todos/${999992}`)
    .expect('Content-Type', /json/)
          .expect(200)
          .then((res) => {
            const todos = res.body;
            expect(todos.id).toEqual(999992)
            expect(todos.title).toEqual("Belajar Sequelize")
            done();


          })
          .catch(err => {
            done(err);
        })




  })

  it("Todo Not Found", (done) => {

    request(app)
    .get(`/todos/${6666}`)
    .expect('Content-Type', /json/)
    .expect(404)
    .then((res) => {
        const error = res.body.error;

        expect(error).toEqual("Todo not found")
        done();
    })
    .catch(err => {
        done(err);
    })


  })

  

})

describe("POST /todos", () => {
  it("Create Todo", (done) => {
    request(app)
      .post("/todos")
      .send({
        title: "Unit Testing"
      })
      .expect('Content-Type', /json/)
      .expect(201) 
      .then((res) => {
        const { message } = res.body;
        
        done();
      })
      .catch((err) => {
        done(err);
      })
  })
})

describe("DELETE /todos/:id", () => {

  it("Todo deleted successfully", (done) => {
    request(app)
    .delete(`/todos/${9999992}`)
            .expect('Content-Type', /json/)
            .expect(404)
            .then((res) => {
                const {message} = res.body;

                expect(message).toBeUndefined();
                done();
            })
            .catch(err => {
                done(err);
            }) 
    })
})







      


        




