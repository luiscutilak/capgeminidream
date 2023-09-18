import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Curso } from './curso';
import { Observable } from 'node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {


  url = "http://localhost/api/projeto-api/php/";

  //Vetor
  vetor: Curso[];

  constructor(private http: HttpClient) { }  // aqui é pra que possamos ter acesso ao nosso banco de dados.

  //Obter todos os cursos: Método obter cursos
  obterCursos():Observable<Curso[]>{
    return this.http.get(this.url+"listar").pipe(//dentro do pipe eu crio um mapeamento(map) para trabalhar com as colunas. DO BANCO DE DADOS
      map((res) => {
        console.log(res);
        this.vetor = res['cursos'];
        return this.vetor;
      })
    )
  }
  //Cadastrar Curso
  cadastrarCurso(c:Curso): Observable<Curso[]>{
    return this.http.post(this.url+'cadastrar', {cursos:c})
    .pipe(map((res) => {
      this.vetor.push(res['cursos']);
      return this.vetor;
    }))
  }

  //implementado método para remover CURSO!

  removerCurso(c:Curso): Observable<Curso[]>{
    const params = new HttpParams().set("idCurso", c.idCurso.toString());

    return this.http.delete(this.url+'excluir', {params: params})
    .pipe(map((res) => {
      const filtro = this.vetor.filter((curso) => {
        return +curso['idCurso'] !== +c.idCurso;
      });

      return this.vetor = filtro;
    }))
  }
}



