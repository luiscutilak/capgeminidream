import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  //URL base

  url = "http://localhost/api/projeto-api/php/"

  //Vetor de Cursos

  vetor: Curso[];

  // Abaixo objeto da classe Curso
  curso = new Curso();

  constructor(private curso_servico:CursoService) { }

  ngOnInit() {
    //Ao iniciar o sistema, deverá listar os cursos
    this.selecao();
  }


  //selecao metodo de selecionar
  selecao() {
    this.curso_servico.obterCursos().subscribe(
      (res: Curso[]) => {
        this.vetor = res;
      }
    )
  }

//cadastro método de cadastrar
cadastro() {
  this.curso_servico.cadastrarCurso(this.curso).subscribe(
    (res:Curso[]) => {
      //adicionado dados ao vetor
      this.vetor = res;

      //Limpar os atributos, ou seja dos atributos.
      this.curso.nomeCurso = null;
      this.curso.valorCurso = null;

      //Atualizar a listagem:

      this.selecao();
    }
  )
}

  //alterar metodo de alterar algo.
  alterar(): void {
    alert("Alterar");
  }

  //Remover, métdodo de excluir
  remover(){
    this.curso_servico.removerCurso(this.curso).subscribe(
      (res : Curso[]) => {
        this.vetor = res;

        this.curso.nomeCurso = null;
        this.curso.valorCurso = null;

      }
    )
  }

  // Selecionar curso especifico:

  selecionarCurso(c:Curso){
    this.curso.idCurso = c.idCurso;
    this.curso.nomeCurso = c.nomeCurso;
    this.curso.valorCurso = c.valorCurso;
  }

}

