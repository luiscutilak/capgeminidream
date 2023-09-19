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
  //courses Vector
  //Vetor de Cursos

  vetor: Curso[];
  //below, object of course class
  // Abaixo objeto da classe Curso
  curso = new Curso();

  constructor(private curso_servico:CursoService) { }
//below onInit. When starting the system, it should list the courses
  ngOnInit() {
    //Ao iniciar o sistema, deverá listar os cursos
    this.selecao();
  }

  //select Method
  //selecao metodo de selecionar
  selecao() {
    this.curso_servico.obterCursos().subscribe(
      (res: Curso[]) => {
        this.vetor = res;
      }
    )
  }
//register method
//cadastro método de cadastrar
cadastro() {
  this.curso_servico.cadastrarCurso(this.curso).subscribe(
    (res:Curso[]) => {
      //add vector data
      //adicionado dados ao vetor
      this.vetor = res;
      //clear Atributtes
      //Limpar os atributos, ou seja dos atributos.
      this.curso.nomeCurso = null;
      this.curso.valorCurso = null;

      //Update the list
      //Atualizar a listagem:

      this.selecao();
    }
  )
}
  //change method
  //alterar metodo de alterar algo.
  alterar(){                          //subscribe retorna uma informação //SUBSCRIBE RETURN INFORMATIONS
    this.curso_servico.atualizarCurso(this.curso).subscribe(
      (res) => {

        //below, update vector
        this.vetor = res;

        //Clear object values
        this.curso.nomeCurso = null;
      }
    )
  }
  //Delet method
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

  // Select specific course
  // Selecionar curso especifico:

  selecionarCurso(c:Curso){
    this.curso.idCurso = c.idCurso;
    this.curso.nomeCurso = c.nomeCurso;
    this.curso.valorCurso = c.valorCurso;
  }

}

