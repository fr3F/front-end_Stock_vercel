import { MessageService } from './../../../shared/message.service';
import { Component, Input, OnInit } from '@angular/core';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrl: './liste-utilisateur.component.css'
})
export class ListeUtilisateurComponent {

  @Input() utilisateurs: any[] = []

  utiliSuppr: boolean = false;
  ErreurSuppr: boolean = false
  idDelete?: number

  constructor(
    private utilisateurService: UtilisateurService,
    private messageService: MessageService
  ) { }

  supprimerUtili(id: number) {
    this.utilisateurService.supprUtilisateur(id).subscribe({
      next: () => {
        this.utilisateurs = this.utilisateurs.filter(
          u => u.id_ut !== id
        );

        this.messageService.valider("Supprimé avec succès");
      },
      error: () => {
        this.messageService.error();
      }
    });
  }

  setIdDelete(id_p: number) {
    this.idDelete = id_p
  }
}
