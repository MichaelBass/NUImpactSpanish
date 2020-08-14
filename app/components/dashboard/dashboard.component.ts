import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import {RedcapService} from "../../services/redcap.service";
import {HelperService} from "../../services/helper.service";
import {Card} from "../../card.model";
import {TimedSegment} from "../../timedsegment.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isWarn: boolean = true;
 
  card = [];
  title: string = "Basado en las respuestas de su cuestionario de salud reciente, los resultados de sus síntomas están en el rango normal sin nada significativo para informar en su panel de control. Este podría no ser siempre el caso ya que los síntomas podrían cambiar con el tiempo y su panel se actualizará cada vez que complete el cuestionario de salud.  Si desea ver los resultados del cuestionario de salud, ingrese en MyChart.";
  no_symptom: string = "Basado en las respuestas de su cuestionario de salud reciente, los resultados de sus síntomas están en el rango normal sin nada significativo para informar en su panel de control. Este podría no ser siempre el caso ya que los síntomas podrían cambiar con el tiempo y su panel se actualizará cada vez que complete el cuestionario de salud.  Si desea ver los resultados del cuestionario de salud, ingrese en MyChart.";
  symptom: string = "Los síntomas a continuación se seleccionaron según sus resultados recientes del cuestionario de salud. Haga clic en la categoría del síntoma para aprender cómo puede usted y su equipo de atención médica manejar el síntoma. Si desea ver su puntaje del cuestionario de salud, ingrese en MyChart.";

	constructor(private route: ActivatedRoute, private redcapService: RedcapService, private helperService: HelperService) { }

	ngOnInit() {

    this.route.queryParamMap.subscribe(
    ( params: ParamMap) => {

        if(params.keys.length == 2){

          var ts = new TimedSegment();

          if( params.get('UUID') == null ){
            ts.user = "undefined";
          }else{
            ts.user = params.get('UUID');
            this.helperService.setCookie("UUID", ts.user, 90);
          }

          let _data = "";
          if( params.get('DATA') != null ){
            _data = params.get('DATA');
            this.helperService.setCookie("DATA", _data, 90);
          }

          ts.topic = "Log-in";
          ts.quantity = 15;

          this.redcapService.initialTimedSegment(ts, _data).subscribe(
            (qs_param: any) => {
              this.redcapService.dashboard = qs_param;
              this.card = this.redcapService.getSymptom_CardsForQS();
              if(this.card.length >0){
                this.title = this.symptom;
              }
            }
          );

        }else{

          if(this.redcapService.getTimedSegment().user == "undefined"){
            var ts = new TimedSegment();
            ts.user =  this.helperService.getCookie("UUID");
            ts.topic = "Log-in";
            ts.quantity = 15;
            this.redcapService.initialTimedSegment(ts, this.helperService.getCookie("DATA")).subscribe(
              (qs_param: any) => {
                this.redcapService.dashboard = qs_param;
                this.card = this.redcapService.getSymptom_CardsForQS();
                if(this.card.length >0){
                  this.title = this.symptom;
                }                
              }
            );
          } else {
            this.card = this.redcapService.getSymptom_CardsForQS();
            if(this.card.length >0){
              this.title = this.symptom;
            } 
          }
        }

      }
    );
    

	}
  dismiss(){
    this.isWarn = false;
  }

  displayAll(){
    this.card = this.redcapService.getSymptom_Cards(0,15);
  }
}
