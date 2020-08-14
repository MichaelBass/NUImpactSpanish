import { Component, OnInit } from '@angular/core';

import {RedcapService} from "../../services/redcap.service";
import {TimedSegment} from "../../timedsegment.model";

@Component({
  selector: 'app-about-my-nm',
  templateUrl: './about-my-nm.component.html',
  styleUrls: ['./about-my-nm.component.scss']
})
export class AboutMyNmComponent implements OnInit {
  card = [
    {
      src: 'assets/img/Barnard.jpg',
      title: 'Cynthia Barnard, PhD, MBA',
      icon:'icon-dashboard',
      link: 'https://www.feinberg.northwestern.edu/faculty-profiles/az/profile.html?xid=16648',
      target:'Para obtener más información sobre su trabajo, haga clic aquí.',
      description: 'Dra. Barnard es una profesora asistente de Medicina (Medicina General Interna y Geriatría) en Northwestern University, Escuela de Medicina Feinberg.  También es la vicepresidente de calidad en Northwestern Memorial HealthCare.'
    },
    {
      src: 'assets/img/Cella.jpg',
      title: 'David Cella, PhD',
      icon:'icon-symptom-library',
      link: 'https://www.feinberg.northwestern.edu/faculty-profiles/az/profile.html?xid=14537',
      target:'Para obtener más información sobre su trabajo, haga clic aquí.',
      description: 'Dr. Cella es profesor Ralph Seal Paffenbarger y presidente del Departamento de Ciencias Sociales Médicas en Northwestern University, Escuela de Medicina Feinberg. Como presidente del departamento, desempeña un papel de liderazgo en el desarrollo y la orquestación de colaboraciones científicas transdisciplinarias.'
    },
    {
      src: 'assets/img/Garcia.jpg',
      title: 'Sofia F. Garcia, PhD',
      icon:'icon-patient-resources',
      link: 'https://www.feinberg.northwestern.edu/faculty-profiles/az/profile.html?xid=16269',
      target:'Para obtener más información sobre su trabajo, haga clic aquí.',
      description: 'Dra. Garcia es profesora asociada de Ciencias Sociales Médicas y Psiquiatría y Ciencias del Comportamiento en la Facultad de medicina Feinberg de la Universidad Northwestern.'
    },
    {
      src: 'assets/img/Kircher.jpg',
      title: 'Sheetal M Kircher, MD',
      icon:'icon-my-favorites',
      link: 'https://www.feinberg.northwestern.edu/faculty-profiles/az/profile.html?xid=28180',
      target:'Para obtener más información sobre su trabajo, haga clic aquí.',
      description: 'Dra. Kircher es oncóloga y profesora asociada de Medicina (Hematología y Oncología) en la Facultad de medicina Feinberg de la Universidad Northwestern.'
    },
    {
      src: 'assets/img/Penedo.jpg',
      title: 'Frank J. Penedo, PhD',
      icon: 'icon-contact-us',
      link: 'https://umiamihealth.org/sylvester-comprehensive-cancer-center/research/faculty/frank-j-penedo',
      target:'Para obtener más información sobre su trabajo, haga clic aquí.',
      description: 'Dr. Penedo es profesor de Psicología y Medicina y director asociado del Instituto de Supervivencia del Cáncer y de las Ciencias del Comportamiento Aplicado en la Universidad de Miami.'
    },
    {
      src: 'assets/img/Scholtens.jpg',
      title: 'Denise M Scholtens, PhD',
      icon: 'icon-contact-us',
      link: 'https://www.feinberg.northwestern.edu/faculty-profiles/az/profile.html?xid=16163',
      target:'Para obtener más información sobre su trabajo, haga clic aquí.',
      description: 'Dra. Scholtens es profesora de Medicina Preventiva (Bioestadística) y Cirugía Neurológica y jefa de la División de Bioestadística de la Facultad de medicina Feinberg de la Universidad de Northwestern.'
    },
    {
      src: 'assets/img/Smith.jpg',
      title: 'Justin Dean Smith, PhD',
      icon: 'icon-contact-us',
      link: 'https://www.feinberg.northwestern.edu/faculty-profiles/az/profile.html?xid=33205',
      target:'Para obtener más información sobre su trabajo, haga clic aquí.',
      description: 'Dr. Smith es profesor asociado de psiquiatría y ciencias del comportamiento, ciencias sociales médicas y medicina preventiva en la Facultad de medicina Feinberg.'
    },
    {
      src: 'assets/img/Yanez.jpg',
      title: 'Betina Yanez, PhD',
      icon: 'icon-contact-us',
      link: 'https://www.feinberg.northwestern.edu/faculty-profiles/az/profile.html?xid=28675',
      target:'Para obtener más información sobre su trabajo, haga clic aquí.',
      description: 'Dra. Yanez es profesora asociada en el Departamento de Ciencias Sociales Médicas de la Facultad de Medicina Feinberg de la Universidad Northwestern. También es la directora del compromiso de pacientes para el Instituto de Supervivencia del Cáncer para el Robert H. Lurie Comprehensive Cancer Center.'
    }
  ]
  
  constructor(private redcapService: RedcapService) { }


  logPDF(doc:string){
    let timedSegment = this.redcapService.getTimedSegment();
    this.redcapService.logWebsite(timedSegment, doc, "pdf").subscribe( res => {});
  }

  ngOnInit() {
  }

}
