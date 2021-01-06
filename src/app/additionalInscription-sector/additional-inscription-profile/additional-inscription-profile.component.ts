import { Component, OnInit } from '@angular/core';
import { AdditionalInscriptionServiceService } from '../../services/additional-inscription-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-additional-inscription-profile',
  templateUrl: './additional-inscription-profile.component.html',
  styleUrls: ['./additional-inscription-profile.component.css']
})
export class AdditionalInscriptionProfileComponent implements OnInit {

  currentInscription =  {name:"",type:"",price:0};
  id;

  constructor(private inscriptionService: AdditionalInscriptionServiceService,
              private router: Router,
              private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
       this.inscriptionService.getInscription(this.id).subscribe(result=>{
         console.log(result['data']['inscription']);
          this.currentInscription =result['data']['inscription'];
      });
    }
  }

  ngOnInit(): void {
  }

  save(newInscription){
    if(this.id) {
      this.inscriptionService.updateInscription(this.id,newInscription).subscribe(result=>{
        this.router.navigate(['/additionalInscriptionslist'])
      });
    }
    else{
        this.inscriptionService.createInscription(newInscription).subscribe(result=>{
          this.router.navigate(['/additionalInscriptionslist'])
    });
      
    }
  }

  deleteInscription(){
    if(confirm('Are you sure you want to delete this product?')){
      this.inscriptionService.deleteInscription(this.id).subscribe(result=>{
        this.router.navigate(['/additionalInscriptionslist'])
      });
    }
    return
  }

}
