import React, { Component } from "react";
import './design.scss';
import Radar from '../Radar/Radar.jsx';
import axios from 'axios';

class App extends Component {
    constructor (props) {
      super(props)
      this.state = {
        myLatitude: 0,
        myLongitude: 0
     }
    }
    geo(){
      if ('geolocation' in navigator) {   // Lo primero que deben hacer es validar si el dispositivo soporta geolocacion
        console.log('has geolocation')


        const success = position => {   // Esta funcion va a ser un callback que va a recibir la posición del dispositivo
            console.log('success', position)
            this.setState({
              myLatitude: position.coords.latitude,
              myLongitude: position.coords.longitude
              
            })
            axios({
              url: 'https://msdeus.site/lab10',
              method: 'post',
              data: {
                  query:
                  `
                  mutation {
                      updateUser (name: "Andres Urizar", latitude: "${position.coords.latitude}", longitude: "${position.coords.longitude}") {
                        name
                      }
                  }
                  `
              }
            }).then(() => { 
          
            })

            /* 
                Position acá es un objeto con las siguientes propiedades:

                latitude : la latitud
                longitude : la longitud
                altitude : la altitud en metros sobre el nivel del mar
                accuracy : el radio, en metros que indica la incertidumbre de la medida de la posición
                altitudeAccuracy : el radio, en metros que indica la incertidumbre de la medida de la altitud
                heading : indica la direccion en la que este dispositivo se esta moviendo (con relacion al norte absoluto)
                speed : la velocidad a la que se mueve en metros sobre segundo
            */
        }

        const error = err => {
            console.log('error', err)

            /*
                El error tiene dos valores, un código de error y un texto

                el codigo puede ser
                - 0 si es un error generico
                - 1 si el usuario respondio que "no" al prompt de "This webpage wants to know your location"
                - 2 si no se pudo determinar la ubicacion, por ejemplo, si no tiene acceso a los satelites de GPS ni a wifi
                - 3 si no se pudo acceder al sensor en el tiempo limite
            */
        }

        // Este metodo nos da la ubicación una unica vez
        const loc = navigator.geolocation.getCurrentPosition(
            success, // esta funcion se va a llamar si fue exitosa la medida
            error,  // esta se va a llamar si no
            { // estos parametros son para configurar la medida
                maximumAge: 1000000,  // esto controla la cache de las mediciones, no necesitan cambiarlo
                timeout: 1000, // si la medida toma un tiempo mayor a este parametro, se va a generar el error 3
                enableHighAccurancy: true // highAccurancy gasta mas bateria y toma mas tiempo, pero tiene mejor accurancy
            }
        )


        // Este metodo nos da la ubicacion cada vez que el usuario se mueva
        const watcher = navigator.geolocation.watchPosition(
            success,  // success se va a llamar dos veces por cada cambio de ubicacion
            error,
            {
                maximumAge: 0,
                enableHighAccurancy: true
            }
        )

        // Para debuggear, usen sus developer tools > el menu de los tres puntos > More tools > Sensors > geolocation
        // Pueden cambiar su ubicacion mientras desarrollan

    } else {
        console.log('doesnt have geolocation')
    }
    }
    componentDidMount(){
      this.geo();
      this.interval = setInterval(() => {
        axios({
            url: 'https://msdeus.site/lab10',
            method: 'post',
            data: {
                query:
                `
                query {
                    allUsers {
                      name
                      latitude
                      longitude
                      updatedAt
                    }
                  }
                `
            }
        }).then(response => {
          console.log(response)
            //console.table(response.data.data.allUsers)
            this.setState({
                users: response.data.data.allUsers
            })
        })
        
        console.log("name: Andres Urizar, latitude:" + this.state.myLatitude+", longitude: "+this.state.myLongitude)
        let posLatitud = 14.6100245;
        let posLongitud = -90.66165029999999;
        let widthR = document.getElementById("radar").offsetWidth; //window.innerWidth;
        widthR = widthR/2
        console.log(widthR)
        let heightR = document.getElementById("radar").offsetHeight; //window.innerHeight;
        heightR = heightR/2
        //console.log(widthR)
       // console.log(heightR)
        //console.log(posLatitud-this.state.myLatitude)



        let formulaLa = (posLatitud-this.state.myLatitude)
        let formulaLo = (posLongitud-this.state.myLongitude)
        console.log("Mis coordeandas")
        console.log(this.state.myLatitude,this.state.myLongitude)

        console.log("Las coordeandas de ellos")
        console.log(posLatitud,posLongitud)

        console.log("Las nuevas coordeandas") 
        console.log(formulaLa,formulaLo)

        
        
    
    }, 9000)
    }
    render () {
      return (
        <div className="app">
            Andres Urizar - Radar
          <Radar />
        </div>
      )
    }
  }
  export default App;
  