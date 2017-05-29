angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('StudentCtrl', function($scope, $http) {
  $scope.newStudent = {};
  $scope.newSubject = {};
  $scope.students = {};
  $scope.selected = false;
  $scope.study = {};


  /** OK **/

  $http.get(API + '/api/students').success(function (data) {
    $scope.students = data;
  })
    .error(function (data) {
      console.log('Error: ' + data);
    });

  $http.get(API + '/api/subjects').success(function (data) {
    $scope.subjects = data;
  })
    .error(function (data) {
      console.log('Error: ' + data);
    });

  /** OK **/

  $scope.registrarPhone = function (newStudent) {
    $http.post(API+ '/api/students/' + $scope.newStudent._id, $scope.newStudent)
      .success(function (data) {
        if (data == false) {
          alert("El número de telèfon no es vàlid");
        }
        else {
          $scope.cleanall(); // Borramos los datos del formulario
          $scope.students = data;
        }
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
    location.reload(); // soluciona un problema con la tabla

  }

  /** OK ***/

  $scope.borrarPhone = function (newStudent) {
    $http.delete(API + '/api/students/' + $scope.newStudent._id + '/' + $scope.newStudent.phone_id)
      .success(function (data) {
        $scope.cleanall();
        $scope.students = data;
        $scope.selected = false;
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
    location.reload(); // soluciona un problema con la tabla
  };

  $scope.addStudy = function (newStudent){
    $http.post(API+ '/api/students/newStudies/' + $scope.newStudent._id, $scope.newStudent)
      .success(function (data) {
        if (data == false) {
          alert("La titulació no és vàlida");
        }
        else {
          $scope.cleanall(); // Borramos los datos del formulario
          $scope.students = data;
        }
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
    location.reload(); // soluciona un problema con la tabla
  };

  $scope.removeStudy = function (newStudent) {
    $http.delete(API + '/api/students/newStudies/' + $scope.newStudent._id + '/' + $scope.newStudent.study)
      .success(function (data) {
        $scope.cleanall();
        $scope.students = data;
        $scope.selected = false;
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
    location.reload(); // soluciona un problema con la tabla
  };

  /** OK **/

  $scope.registrarStudent = function (res) {

    if (confirm("Ets " + $scope.newStudent.name + "?")) {
      $http.post(API + '/api/students', $scope.newStudent)
        .success(function (data) {
          $scope.cleanall(); // Borramos los datos del formulario
          $scope.students = data;
        })
        .error(function (data) {
          console.log('Error: ' + data);
        });
    }
    location.reload(); // soluciona un problema con la tabla
  };

  /** OK **/

  $scope.modificarStudent = function (newStudent) {
    $http.put(API + '/api/students/' + $scope.newStudent._id, $scope.newStudent)
      .success(function (data) {
        $scope.cleanall(); // Borramos los datos del formulario
        $scope.students = data;
        $scope.selected = false;
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };

  /** OK **/

  $scope.borrarStudent = function (newStudent) {
    $http.delete(API + '/api/students/' + $scope.newStudent._id)
      .success(function (data) {
        $scope.cleanall();
        $scope.students = data;
        $scope.selected = false;
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };

  $scope.filterStudentByStudy = function (newStudy) {
    $http.get(API + '/api/students/studies/' + newStudy)
      .success(function(data){
        console.log(data);
        $scope.students = data;
        $scope.cleanall();
      })
      .error(function(data){
        console.log('Error:' + data);
      });

  };

  /** OK **/

  $scope.filterStudent = function (res) {

    $http.get(API + '/api/students/name/' + $scope.newStudent.name)
      .success(function (data) {
        if (data == false) {
          alert("No hi ha cap estudiant amb aquest nom");
        }
        else {
          $scope.students = data;
          $scope.cleanall(); // Borramos los datos del formulario
        }
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });

  };

  /** OK **/
  $scope.filterStudentOrderByName = function (res) {

    $http.get(API + '/api/studentsbyname')
      .success(function (data) {
        if (data == false) {
          alert("No hi ha estudiants");
        }
        else {
          console.log(data);
          $scope.students = data;
          $scope.cleanall();
        }
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };

  /** OK **/

  $scope.selectSubject = function (subject) {
    $scope.newSubject = subject;
    $scope.selected = true;
    console.log($scope.newSubject, $scope.selected);
  };

  $scope.selectStudent = function (student) {
    $scope.newStudent = student;
    $scope.selected = true;
    console.log($scope.newStudent, $scope.selected);
  };

  $scope.selectPhone = function (phone) {
    $scope.newStudent.type = phone.type;
    $scope.newStudent.number = phone.number;
    $scope.newStudent.phone_id = phone._id;
    $scope.selected = true;
    console.log($scope.newStudent, $scope.selected);
  };

  $scope.cleanall = function () {
    $scope.newStudent = {};
  };
})

.controller('SubjectCtrl', function($scope, $stateParams, $http) {

  $scope.newSubject = {};
  $scope.subjects = {};
  $scope.students = {};
  $scope.selected = false;


  $scope.cleanall = function () {
    $scope.newSubject = {};
  };

  /*** OK ***/

  $http.get(API + '/api/subjects').success(function (data) {
    $scope.subjects = data;
  })
    .error(function (data) {
      console.log('Error: ' + data);
    });


  $http.get(API + '/api/students').success(function (data) {
    $scope.students = data;
  })
    .error(function (data) {
      console.log('Error: ' + data);
    });


  // Función para filtrar por alumno

  $scope.filterSubject = function (res) {

    $http.get(API + '/api/subjects/' + $scope.newSubject.students)
      .success(function (data) {
        if (data == false) {
          alert("L'alumne no té cap assignatura");
        }
        else {
          $scope.subjects = data;
          $scope.cleanall(); // Borramos los datos del formulario
        }
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });

  };

  /*** OK ***/

  // Función para filtrar por nombre de asignatura

  $scope.filterSubject = function (res) {

    $http.get(API + '/api/subjects/name/' + $scope.newSubject.name)
      .success(function (data) {
        if (data == false) {
          alert("No hi ha cap assignatura amb aquest nom");
        }
        else {
          $scope.subjects = data;
          $scope.cleanall(); // Borramos los datos del formulario
        }
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });

  };

  /*** OK ***/

  // Función para filtrar por periodo

  $scope.filterSubjectbyPeriod = function (res) {

    $http.get(API + '/api/subjects/period/' + $scope.newSubject.periode)
      .success(function (data) {
        if (data == false) {
          alert("No hi ha cap assignatura en aquest període");
        }
        else {
          $scope.subjects = data;
          $scope.cleanall(); // Borramos los datos del formulario
        }
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });

  };

  // Función para filtrar alfabéticamente

  $scope.filterSubjectbyName = function (res) {

    $http.post('/api/subjectsbyname', $scope.newSubject)
      .success(function (data) {
        if (data == false) {
          alert("No hi ha assignatures");
        }
        else {
          $scope.subjects = data;
          $scope.cleanall(); // Borramos los datos del formulario
        }
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });

  };

  // Función para filtrar per nombre d'alumnes
  $scope.filterSubjectbyNumber = function (res) {

    $http.get('/api/subjects', $scope.newSubject)
      .success(function (data) {
        if (data == false) {
          alert("No hi ha assignatures");
        }
        else {
          $scope.subjects = data;
          $scope.cleanall(); // Borramos los datos del formulario
        }
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });

  };


  /*** OK ***/

  $scope.addStudentToSubject = function (id) {
    $scope.newStudent = {
      student_id: id
    };
    $http.post(API + '/api/subjects/' + $scope.newSubject._id + '/student/' , $scope.newStudent)
      .success(function(data){
        $scope.subject = data;
      })
      .error(function(data){
        console.log('Error:' + data);
      });
    console.log("Afegit estudiant ID " + $scope.newStudent.name + " a " + $scope.newSubject.name)
    location.reload();
  };

  /*** OK ***/

  $scope.borrarStudentFromSubject = function (id) {
    $http.delete(API + '/api/subjects/' + $scope.newSubject._id + '/student/' + id)
      .success(function(data){
        $scope.subject = data;
      })
      .error(function(data){
        console.log('Error:' + data);
      });
    console.log("Esborrat estudiant " + $scope.newStudent.name + " a " + $scope.newSubject.name)
    location.reload();
  };

  /*** OK ***/

  // Función para registrar una asignatura

  $scope.registrarSubject = function (res) {

    $http.post(API + '/api/subjects', $scope.newSubject)
      .success(function (data) {
        $scope.cleanall(); // Borramos los datos del formulario
        $scope.subjects = data;
      })
      .error(function (data) {
        $scope.cleanall(); // Borramos los datos del formulario
        alert(data);
        console.log('Error: ' + data);
      });

  };

  /*** OK ***/

  // Función para editar los datos de una asignatura

  $scope.modificarSubject = function (newSubject) {
    $http.put(API + '/api/subjects/' + $scope.newSubject._id, $scope.newSubject)
      .success(function (data) {
        $scope.cleanall(); // Borramos los datos del formulario
        $scope.subjects = data;
        $scope.selected = false;
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };

  /*** OK ***/

  // Función que borra un objeto asignatura conocido su id
  $scope.borrarSubject = function (newSubject) {
    $http.delete(API + '/api/subjects/' + $scope.newSubject._id)
      .success(function (data) {
        $scope.cleanall();
        $scope.subjects = data;
        $scope.selected = false;
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };

  // Función para coger el objeto asignatura seleccionado en la tabla
  $scope.selectSubject = function (subject) {
    $scope.newSubject = subject;
    $scope.selected = true;
    console.log($scope.newSubject, $scope.selected);
  };

  $scope.selectStudent = function (student) {
    $scope.newStudent = student;
    $scope.selected = true;
    console.log($scope.newStudent, $scope.selected);
  };

});
