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

  //Vector
  vetor: Curso[];
                                            //this is so we can have acces to our database.
  constructor(private http: HttpClient) { }  // aqui é pra que possamos ter acesso ao nosso banco de dados.
//Get all courses and methods
  //Obter todos os cursos: Método obter cursos
  obterCursos(): Observable<Curso[]> {                // Inside the pipe I create a mapping, to work with the columns, from the DATABASE
    return this.http.get(this.url + "listar").pipe(//dentro do pipe eu crio um mapeamento(map) para trabalhar com as colunas. DO BANCO DE DADOS
      map((res) => {
        this.vetor = res['cursos'];
        return this.vetor;

      })
    )
  }
  //register course
  //Cadastrar Curso
  cadastrarCurso(c: Curso): Observable<Curso[]> {
    return this.http.post(this.url + 'cadastrar', { cursos: c })
      .pipe(map((res) => {
        this.vetor.push(res['cursos']);
        return this.vetor;
      }))
  }


  //implementing method to remove course
  //implementado método para remover CURSO!

  removerCurso(c: Curso): Observable<Curso[]> {
    const params = new HttpParams().set("idCurso", c.idCurso.toString());

    return this.http.delete(this.url + 'excluir', { params: params })
      .pipe(map((res) => {
        const filtro = this.vetor.filter((curso) => {
          return +curso['idCurso'] !== +c.idCurso;
        });

        return this.vetor = filtro;
      }))
  }

  //Update Course
  //Atualizar Curso
  atualizarCurso(c: Curso): Observable<Curso[]> {
    //below, execute the change URL.
    //abaixo executa a alteração via URL
    return this.http.put(this.url + 'alterar', { cursos: c })
      // Traverse the vector to find out what the changed course id is.
      //Percorrer o vetor para saber qual é o id do curso alterado.
      .pipe(map((res) => {
        const cursoAlterado = this.vetor.find((item) => {
          return +item['idCurso'] === +['idCurso'];
        });
        // below when finding the course changes the value of the local vector.
        // abaixo quando encontrar o curso altera valor do vetor local
        if (cursoAlterado) {
          cursoAlterado['nomeCurso'] = c['nomeCurso'];
          cursoAlterado['valorCurso'] = c['valorCurso'];
        }
        //
        //Retorno
        return this.vetor;
      }))
  }
}



