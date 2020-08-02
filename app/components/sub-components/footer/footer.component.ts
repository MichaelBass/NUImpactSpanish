import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
	navLinks = [
		{
			path: 'dashboard',
			label: 'Tablero',
			icon: 'icon-dashboard'
		},
		{
			path: 'symptom-library',
			label: 'Biblioteca de síntomas',
			icon: 'icon-symptom-library'
		},
		{
			path: 'patient-resources',
			label: 'Recursos para pacientes',
			icon: 'icon-patient-resources'
		},
		{
			path: 'my-favorites',
			label: 'Mis favoritos',
			icon: 'icon-my-favorites'
		},
		{
			path: 'contact-us',
			label: 'Contáctanos',
			icon: 'icon-contact-us'
		}
	]
	constructor() { }

	ngOnInit() {
	}

	goToTop(){ 
		window.scrollTo(0, 0);
	}
	
}
