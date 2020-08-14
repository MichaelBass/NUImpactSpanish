import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";
import { of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {TimedSegment} from "../timedsegment.model";
import {WebResource} from "../webresource.model";
import {Card} from "../card.model";
import {Card2} from "../card2.model";
import {Card3} from "../card3.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'text/html; charset=utf-8','Accept':'application/json','Access-Control-Allow-Origin':'*' }) 
  };

export const defaultTimedSegment: TimedSegment = JSON.parse("{\"user\":\"undefined\",\"topic\":\"Dashboard\",\"quantity\":15}");
export const limitTimedSegment: TimedSegment = JSON.parse("{\"user\":\"Done\",\"topic\":\"Done\",\"quantity\":1}");
export const THRESHOLD: number = 4;

export const TREATMENT_CARDS: Card3[] = [
    {
      src: 'assets/img/PalliativeCare_A.jpg',
      label: 'Cuidado paliativo',
      icon:'icon-dashboard',
      text:'El objetivo de los cuidados paliativos es brindar alivio del dolor y de la incomodidad. Este cuidado también puede brindar cuidados físicos, emocionales y espirituales.',
      route:'patient-resources',
      route2:'treatment',
      route3:'palliative'
    },
    {
      src: 'assets/img/IntegrativeCare_A.jpg',
      label: 'Medicina holística',
      icon:'icon-dashboard',
      text:'Este tipo de medicina incorpora las terapias holísticas para captar tu mente, cuerpo y espíritu.',
      route:'patient-resources',
      route2:'treatment',
      route3:'integrative'
    },
    {
      src: 'assets/img/CancerRehabilitationServices_A.jpg',
      label: 'Servicios de rehabilitación de cáncer',
      icon:'icon-dashboard',
      text:'Aquí encontrará los servicios de rehabilitación que Northwestern Medicine le brinda a sus pacientes.',
      route:'patient-resources',
      route2:'treatment',
      route3:'rehabilitation'
    },
    {
      src: 'assets/img/CancerSurvivorship_A.jpg',
      label: 'Servicios de supervivencia del cáncer',
      icon:'icon-dashboard',
      text:'Los servicios descriptos aquí pueden ayudar a los sobrevivientes a vivir una vida saludable y suficiente.',
      route:'patient-resources',
      route2:'treatment',
      route3:'survivorship'
    }
]
export const FINANCIAL_CARDS: Card3[] = [
    {
      src: 'assets/img/ManagingtheCostofTreatment_A.jpg',
      label: 'Gestionar el costo del tratamiento',
      icon:'icon-dashboard',
      text:'Hay recursos disponibles para ayudarlo/la a gestionar el costo del tratamiento, los medicamentos, los copagos, la guardería, atención domiciliaria, etc.',
      route:'patient-resources',
      route2:'financial',
      route3:'cost'
    },
    {
      src: 'assets/img/ManagingLegalWorkplaceIssues_A.jpg',
      label: 'Problemas legales y laborales',
      icon:'icon-dashboard',
      text:'Aquí encontrará recursos que pueden ayudarlo/la a gestionar cualquier preocupación que pueda tener sobre problemas laborales, del seguro y otros problemas legales.',
      route:'patient-resources',
      route2:'financial',
      route3:'legal'
    },
    {
      src: 'assets/img/ManagingTransportationandOtherConcerns_A.jpg',
      label: 'Gestión del transporte y otras preocupaciones',
      icon:'icon-dashboard',
      text:'Hay servicios que pueden ayudar a cubrir todo o casi todo el costo del transporte hacia y desde la consulta médica, las comidas y el alojamiento.',
      route:'patient-resources',
      route2:'financial',
      route3:'transportation'
    },
    {
      src: 'assets/img/BodyImageConcerns_A.jpg',
      label: 'Control de la pérdida de cabello y preocupaciones por el aspecto',
      icon:'icon-dashboard',
      text:'Existen recursos que pueden ayudarlo/la con su aspecto y bienestar después de atravesar el cáncer.',
      route:'patient-resources',
      route2:'financial',
      route3:'bodyimage'
    }        
]
export const WELLBEING_CARDS: Card3[] = [
    {
      src: 'assets/img/TalkingwithYourHealthCareTeam_A.jpg',
      label: 'Hablar con su equipo de atención médica',
      icon:'icon-dashboard',
      text:'Aquí hay algunos consejos para asegurar que sus conversaciones con su equipo de atención médica son positivas y productivas.',
      route:'patient-resources',
      route2:'well-being',
      route3:'talking'
    }, 
    {
      src: 'assets/img/SocialSupport_A.jpg',
      label: 'Soporte social',
      icon:'icon-dashboard',
      text:'Aquí hay estrategias sobre cómo pedir ayuda a su familia y amigos durante y luego del cáncer.',
      route:'patient-resources',
      route2:'well-being',
      route3:'social'
    },
    {
      src: 'assets/img/StressManagement_A.jpg',
      label: 'Manejo del estrés',
      icon:'icon-dashboard',
      text:'Aprender cómo abordar su estrés puede ayudarle a manejar los estresores que puede enfrentar cada día.',
      route:'patient-resources',
      route2:'well-being',
      route3:'stress'
    },
    {
      src: 'assets/img/PhysicalActivity_A.jpg',
      label: 'Actividad física',
      icon:'icon-dashboard',
      text:'Estar activo mejora su bienestar general, pero antes de comenzar asegúrese de preguntarle a su doctor/a.',
      route:'patient-resources',
      route2:'well-being',
      route3:'physical'
    },
    {
      src: 'assets/img/ProblemSolving_A.jpg',
      label: 'Solución de problemas bajo estrés',
      icon:'icon-dashboard',
      text:'Aquí hay estrategias que puede utilizar para solucionar problemas cuando está estresado/a o cuando se encuentra con estresores relacionados con el cáncer.',
      route:'patient-resources',
      route2:'well-being',
      route3:'problem'
    },
    {
      src: 'assets/img/SmokingCessationandSubstanceUse_A.jpg',
      label: 'Cese de fumar y del uso de sustancias',
      icon:'icon-dashboard',
      text:'Fumar y el uso de sustancias afecta de forma negativa su salud mental y física. Aquí encontrará recursos para dejarlo de hacer.',
      route:'patient-resources',
      route2:'well-being',
      route3:'smokingcessation'
    },
    {
      src: 'assets/img/SunProtection_A.jpg',
      label: 'Protección solar',
      icon:'icon-dashboard',
      text:'Todos aman divertirse un poco bajo el sol.  Aquí hay algunos pasos que puede tomar para protegerlo/a de los rayos dañinos UV.',
      route:'patient-resources',
      route2:'well-being',
      route3:'sunprotection'
    },
    {
      src: 'assets/img/SupportiveOncologyandPalliativeCare_A.jpg',
      label: 'Oncología de apoyo y cuidado paliativo',
      icon:'icon-dashboard',
      text:'Aquí aprenderá cómo un grupo de prestadores de atención médica está listo para mejorar y gestionar su experiencia del tratamiento.',
      route:'patient-resources',
      route2:'well-being',
      route3:'supportive'
    }        
]

export const COMMUNITY_CARDS: Card3[] = [
    {
      src: 'assets/img/LocalSupportGroupsCommunities_A.jpg',
      label: 'Grupos de apoyo locales y comunidades',
      icon:'icon-dashboard',
      text:'Hay grupos de apoyo locales que están listos para ayudarlo/la y escucharlo/la.',
      route:'patient-resources',
      route2:'community',
      route3:'local'
    },   
    {
      src: 'assets/img/SupportOnlinebyPhone_A.jpg',
      label: 'Apoyo en línea y por teléfono',
      icon:'icon-dashboard',
      text:'Está solo a un clic y/o de una llamada para obtener el apoyo que necesita.',
      route:'patient-resources',
      route2:'community',
      route3:'online'
    }, 
    {
      src: 'assets/img/SupportiveOncologyatNM_A.jpg',
      label: 'Oncología de apoyo en Northwestern Medicine',
      icon:'icon-dashboard',
      text:'Aquí en Northwestern Medicine, hay servicios disponibles para apoyar su transcurso en el cáncer.',
      route:'patient-resources',
      route2:'community',
      route3:'oncology'
    },
    {
      src: 'assets/img/OneonOneSupportfromCancerSurvivors_A.jpg',
      label: 'El soporte individual de los sobrevivientes del cáncer',
      icon:'icon-dashboard',
      text:'Hay organizaciones que ayudan a pares de individuos a compartir su historia del cáncer con otros que tienen los mismos diagnósticos.',
      route:'patient-resources',
      route2:'community',
      route3:'survivors'
    }
  ]

export const DIET_CARDS: Card3[] = [
  
    {
      src: 'assets/img/HealthyFoods_A.jpg',
      label: 'Comidas saludables',
      icon:'icon-dashboard',
      text:'Saber el tipo de comidas para incorporar en su dieta es el primer paso importante para vivir una vida saludable.',
      route:'patient-resources',
      route2:'diet-nutrition',
      route3:'healthy-foods'
    }, 
    {
      src: 'assets/img/ManagingWeightGain_A.jpg',
      label: 'Manejo del aumento de peso',
      icon:'icon-dashboard',
      text:'Los medicamentos y la quimioterapia pueden hacer que los pacientes suban de peso. Aprender a cómo manejarlo es esencial para mantenerse sano/a.',
      route:'patient-resources',
      route2:'diet-nutrition',
      route3:'weight-gain'
    },    
    {
      src: 'assets/img/ManagingWeightLoss_A.jpg',
      label: 'Manejo de la pérdida de peso',
      icon:'icon-dashboard',
      text:'Asegurarse de que su cuerpo tenga los nutrientes necesarios para ser autosuficiente es importante para su salud en general.',
      route:'patient-resources',
      route2:'diet-nutrition',
      route3:'weight-loss'
    },
    {
      src: 'assets/img/DealingwithLossofAppetite_A.jpg',
      label: 'Lidiando con la pérdida de apetito',
      icon:'icon-dashboard',
      text:'Comer cuando no tiene hambre puede ser una tarea difícil. En esta sección aprenderá a cómo gestionar este problema.',
      route:'patient-resources',
      route2:'diet-nutrition',
      route3:'loss-of-appetite'
    },
    {
      src: 'assets/img/Nutrition Tips_A.jpg',
      label: 'Consejos nutricionales',
      icon:'icon-dashboard',
      text:'Aquí hay algunos consejos nutricionales adicionales que tal vez quisiera probar.',
      route:'patient-resources',
      route2:'diet-nutrition',
      route3:'nutrition-tips'
    }
  ]
export const RESOURCE_CARDS: Card2[] = [
    {
      src: 'assets/img/enhancing.png',
      label: 'Mejorando su bienestar',
      icon:'icon-dashboard',
      text:'Haga clic aquí para aprender sobre cómo puede hablar con su equipo de atención médica y otros consejos sobre cómo mantener o mejorar su salud.',
      route:'patient-resources',
      route2:'well-being'
    },
    {
      src: 'assets/img/community.png',
      label: 'Recursos comunitarios',
      icon:'icon-symptom-library',
      text:'Haga clic aquí para aprender sobre los grupos de apoyo local y el apoyo individual.',
      route:'patient-resources',
      route2:'community'
    },
    {
      src: 'assets/img/Financial_A.jpg',
      label: 'Recursos financieros',
      icon:'icon-patient-resources',
      text:'Vea esta sección para encontrar recursos sobre el manejo de los costos de los medicamentos, los tratamientos, el transporte hacia y desde las consultas médicas, y aprender a cómo gestionar problemas legales y laborales.',
      route:'patient-resources',
      route2:'financial'
    },
    {
      src: 'assets/img/Diet_A.jpg',
      label: 'Dieta y nutrición',
      icon:'icon-my-favorites',
      text:'Haga clic aquí para aprender sobre las estrategias para controlar el aumento de peso, la pérdida de peso, la pérdida de apetito, y mucho más durante y después del tratamiento del cáncer.',
      route:'patient-resources',
      route2:'diet-nutrition'
    },
    {
      src: 'assets/img/treatment.png',
      label: 'Gestión del tratamiento de síntomas',
      icon: 'icon-contact-us',
      text:'Vea esta sección para saber sobre los servicios de Northwestern Medicine que pueden ayudarlo/la a gestionar sus síntomas para que pueda sentirse de la mejor forma.',
      route:'patient-resources',
      route2:'treatment'
    }
  ]

export const SYMPTOM_CARDS: Card[] = [
      {
        src: 'assets/img/Pain_A.jpg',
        label: 'Dolor',
        icon:'icon-dashboard',
        text:'Haga clic aquí para aprender sobre las estrategias que puede intentar para reducir el dolor y aprender cómo su equipo de atención médica puede ayudar.',
        route:'symptom-library-pain'
      },
      {
        src: 'assets/img/Fatigue_A.jpg',
        label: 'Fatiga',
        icon:'icon-symptom-library',
        text:'Haga clic aquí para aprender sobre las estrategias que puede intentar para aliviar la fatiga y aprender cómo su equipo de atención médica puede ayudar.',
        route:'symptom-library-fatigue'
      },
      {
        src: 'assets/img/Sadness_A.jpg',
        label: 'Tristeza',
        icon:'icon-patient-resources',
        text:'Haga clic aquí para aprender sobre las estrategias que puede intentar para reducir la tristeza y aprender cómo su equipo de atención médica puede ayudar.',
        route:'symptom-library-depression'
      },
      {
        src: 'assets/img/Anxiety_A.jpg',
        label: 'Ansiedad',
        icon:'icon-my-favorites',
        text:'Vea esta sección para aprender sobre las estrategias que puede intentar para reducir la ansiedad y aprender cómo su equipo de atención médica puede ayudar.',
        route:'symptom-library-anxiety'
      },
      {
        src: 'assets/img/Insomnia_A.jpg',
        label: 'Insomnio',
        icon: 'icon-contact-us',
        text:'Vea esta sección para aprender sobre las estrategias que puede intentar para aliviar insomnio y aprender cómo su equipo de atención médica puede ayudar.',
        route:'symptom-library-insomnia'
      },
      {
        src: 'assets/img/PhysicalFunction_A.jpg',
        label: 'Función física',
        icon: 'icon-contact-us',
        text:'Haga clic aquí para aprender sobre las estrategias que puede intentar para mejorar la función física y aprender cómo su equipo de atención médica puede ayudar.',
        route:'symptom-library-physicalfunction'
      },
      {
        src: 'assets/img/Nausea_A.jpg',
        label: 'Náuseas y vómitos',
        icon: 'icon-contact-us',
        text:'Vea esta sección para aprender sobre las estrategias que puede intentar reducir las nauseas y vómitos y aprender cómo su equipo de atención médica puede ayudar.',
        route:'symptom-library-nausea'
      },
      {
        src: 'assets/img/ShortnessofBreath_A.jpg',
        label: 'Falta de aliento',
        icon: 'icon-contact-us',
        text:'Haga clic aquí para aprender sobre la falta de aliento y cómo su equipo de atención médica puede ayudar.',
        route:'symptom-library-breath'
      },
      {
        src: 'assets/img/Constipation_A.jpg',
        label: 'Constipación',
        icon: 'icon-contact-us',
        text:'Vea esta sección para aprender sobre las estrategias que puede intentar para aliviar la constipación y aprender cómo su equipo de atención médica puede ayudar.',
        route:'symptom-library-constipation'
      },
      {
        src: 'assets/img/Diarrhea_A.jpg',
        label: 'Diarrea',
        icon: 'icon-contact-us',
        text: 'Vea esta sección para aprender sobre las estrategias que puede intentar para aliviar la diarrea y aprender cómo su equipo de atención médica puede ayudar.',
        route:'symptom-library-diarrhea'
      },
      {
        src: 'assets/img/Sex_Life_A.jpg',
        label: 'Cambios en su vida sexual',
        icon: 'icon-contact-us',
        text:'Haga clic aquí para aprender sobre cómo el cáncer puede afectar su vida sexual y cómo su equipo de atención médica puede ayudar.',
        route:'symptom-library-sexlife'
      },
      {
        src: 'assets/img/Neuropathy_A.jpg',
        label: 'Neuropatía periférica',
        icon: 'icon-contact-us',
        text:'Vea esta sección para aprender sobre las estrategias que puede intentar para aliviar la neuropatía periférica y aprender cómo su equipo de atención médica puede ayudarlo/la.',
        route:'symptom-library-neuropathy'
      },
      {
        src: 'assets/img/Lymphedema_A.jpg',
        label: 'Linfedema',
        icon: 'icon-contact-us',
        text: 'Haga clic aquí para saber sobre las estrategias que puede intentar para aliviar la linfedema y aprender cómo su equipo de atención médica puede ayudarlo/la.',
        route:'symptom-library-lymphedema'
      },
      {
        src: 'assets/img/MouthSores_A.jpg',
        label: 'Llagas orales',
        icon: 'icon-contact-us',
        text: 'Vea esta sección para aprender sobre las estrategias que puede intentar para aliviar las llagas orales y aprender cómo su equipo de atención médica puede ayudarlo/la.',
        route:'symptom-library-mouthsores'
      },
      {
        src: 'assets/img/Skin_A.jpg',
        label: 'Piel seca, con prurito/ampollada, o dolorosa',
        icon: 'icon-contact-us',
        text: 'Haga clic aquí para saber sobre las estrategias que puede intentar para aliviar la piel seca, con prurito/ampollada, o dolorosa y aprender cómo su equipo de atención médica puede ayudarlo/la.',
        route:'symptom-library-skin'
      }
    ]


@Injectable({
  providedIn: 'root'
})
export class RedcapService {

	timedSegment: TimedSegment;
  lastTimedSegment: TimedSegment;
  timelimit: number;

  dashboard: string[];

  favoriteCards: Card3[];

  constructor(private http: HttpClient) {
  	this.timedSegment = defaultTimedSegment;
    this.timelimit = 0;

    this.favoriteCards = [];

    var favorites = this.favoriteCards;
    TREATMENT_CARDS.forEach(function(item){
      favorites.push(item);
    });

    FINANCIAL_CARDS.forEach(function(item){
      favorites.push(item);
    });

    WELLBEING_CARDS.forEach(function(item){
      favorites.push(item);
    });

    COMMUNITY_CARDS.forEach(function(item){
      favorites.push(item);
    });

    DIET_CARDS.forEach(function(item){
      favorites.push(item);
    });

  }

  getCommunity_Cards(start:number, end:number): Card3[]{
    return COMMUNITY_CARDS.slice(start, end);
  } 
  getWellBeing_Cards(start:number, end:number): Card3[]{
    return WELLBEING_CARDS.slice(start, end);
  }
  getFinancial_Cards(start:number, end:number): Card3[]{
    return FINANCIAL_CARDS.slice(start, end);
  }

  getTreatment_Cards(start:number, end:number): Card3[]{
    return TREATMENT_CARDS.slice(start, end);
  }

  getDiet_Cards(start:number, end:number): Card3[]{
    return DIET_CARDS.slice(start, end);
  }

  getResource_Cards(start:number, end:number): Card2[]{
    return RESOURCE_CARDS.slice(start, end);
  }

  getSymptom_Cards(start:number, end:number): Card[]{
    return SYMPTOM_CARDS.slice(start, end);
  }

  getSymptom_CardsForQS(): Card[]{

    var _return = [];

    if(this.dashboard == undefined){
      //_return.push(SYMPTOM_CARDS[8]);
      return _return;
    }

    this.dashboard.forEach(element => {
       if(element == "Physical Function"){
       _return.push(SYMPTOM_CARDS[5]);
      }
      if(element == "Pain Interference"){
       _return.push(SYMPTOM_CARDS[0]);
      }       
      if(element == "Anxiety"){
       _return.push(SYMPTOM_CARDS[3]);
      }
      if(element == "Depression"){
       _return.push(SYMPTOM_CARDS[2]);
      }      
      if(element == "Fatigue"){
       _return.push(SYMPTOM_CARDS[1]);
      }
    });

    return _return;
  }
  getTimedSegment(): TimedSegment{


  	if(this.timedSegment == undefined){
		  this.timedSegment = defaultTimedSegment;
  	} 
    if(this.lastTimedSegment == undefined){
      this.lastTimedSegment = defaultTimedSegment;
    }


    if(this.lastTimedSegment.topic == this.timedSegment.topic){
      this.timelimit = this.timelimit + 1;
    }else{
      this.timelimit = 0;
    }

    return this.timedSegment;

  }

  getLastTimedSegment(): TimedSegment{
    return this.lastTimedSegment ;
  }


  initialTimedSegment(ts: TimedSegment, data:string):Observable<any>  {
    this.timedSegment = ts;
     return this.http.post<any>('https://symon.fsm.northwestern.edu/impactWS/Crypto', JSON.parse("{\"user\":\"" + ts.user + "\",\"data\":\"" + data + "\"}") ).pipe(
        map(res => res),
        catchError(this.handleError)
      );    
  }

  setTimedSegment(ts: TimedSegment) {
    this.timelimit = 0;
    this.lastTimedSegment.topic = this.timedSegment.topic;
  	this.timedSegment = ts;
  }


  persistTimedSegment(ts: TimedSegment): Observable<TimedSegment> {

    if(this.timelimit > THRESHOLD){
      return of(limitTimedSegment);
    }

    if(ts.user == "undefined"){
      return of(limitTimedSegment);
    }
 
    return this.http.put<TimedSegment>('https://symon.fsm.northwestern.edu/impactWS/TimeSegment', ts)
      .pipe(
        map(res => new TimedSegment().deserialize(res)),
        catchError(this.handleError)
      );
         
  }

  logWebsite(ts: TimedSegment, site: string, type: string): Observable<WebResource>{

      var wr = new WebResource();
      wr.user = ts.user;
      wr.site = site;
      wr.type = type;
 
      if(ts.user == "undefined"){
        return of(wr);
      }

     return this.http.put<WebResource>('https://symon.fsm.northwestern.edu/impactWS/WebResource', wr).pipe(
        map(res => new WebResource().deserialize(res)),
        catchError(this.handleError)
      );
  }

  handleError(error) {
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       // client-side error
       errorMessage = `Error: ${error.error.message}`;
     } else {
       // server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
   }

  saveFavorites(user: string, segment: string): Observable<any>{

    if(user == "undefined"){
      return of(Card3);
    }

    var data = JSON.parse( "{\"user\":\"" + user +   "\",\"segment\":\"" + segment + "\"}");
    return this.http.put<any>('https://symon.fsm.northwestern.edu/impactWS/Favorites', data);
  }

  deleteFavorites(user: string, segment: string): Observable<any>{
 
    if(user == "undefined"){
      return of(Card3);
    }

    var data = JSON.parse("{\"body\":{\"user\":\"" + user +   "\",\"segment\":\"" + segment + "\"}}");
    return this.http.delete<any>('https://symon.fsm.northwestern.edu/impactWS/Favorites', data);
  }

  getFavorites(user: string): Observable<any>{

    if(user == "undefined"){
       return of(Card3);
    }

      var data = JSON.parse( "{\"user\":\"" + user + "\"}" );
      return this.http.post<any>('https://symon.fsm.northwestern.edu/impactWS/Favorites', data)
      .pipe(
        map(res => res),
        catchError(this.handleError)
      );
  }

}
