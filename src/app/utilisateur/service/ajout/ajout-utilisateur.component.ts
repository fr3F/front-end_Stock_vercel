import { Component, EventEmitter, Output } from '@angular/core';
import { UtilisateurService } from '../utilisateur.service';
import { AuthService } from '../../../auth/auth.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../../shared/message.service';

@Component({
  selector: 'app-ajout-utilisateur',
  templateUrl: './ajout-utilisateur.component.html',
  styleUrl: './ajout-utilisateur.component.css'
})
export class AjoutUtilisateurComponent {

  myForm: FormGroup
  @Output() ajoutUti = new EventEmitter();

  role: string = "";
  email_ut: string = "";
  mdp_ut: string = "";
  mdp: string = "";

  constructor(
    private ajoutService: UtilisateurService,
    private auhtService: AuthService,
    private fb: FormBuilder,
    private messsageService: MessageService

  ) {
    this.myForm = this.fb.group({
      role: [this.role, Validators.required],
      email_ut: [this.email_ut, Validators.required],
      mdp_ut: [this.mdp_ut, Validators.required],
      mdp: [this.mdp, Validators.required],

    })
  };

  ajouterUtilisateur() {
    const utilisateur = {
      email_ut: this.email_ut,
      mdp_ut: this.mdp_ut
    };

    console.log("les utilisateur", utilisateur);

    this.ajoutService.ajoutUtilisateur(utilisateur).subscribe(
      (response: any) => {
        // Message avec succéss
        this.messsageService.valider("Ajout avec success");
        this.ajoutUti.emit(response);
      },

      (erreur: any) => {
        // Message d'erreur
        this.messsageService.error();
      }
    )
  }


  register(): void {
    this.auhtService.register(this.role, this.email_ut, this.mdp_ut).subscribe(
      response => {

        this.messsageService.valider("registre avec success");
        this.ajoutUti.emit(response);

      },

      erreur => {
        // Message d'erreur
        this.messsageService.error();
      }
    );
  }
}

