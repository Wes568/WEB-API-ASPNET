		var tbody = document.querySelector('table');
		var aluno = {};

		function Cadastrar(){
			aluno.nome = document.querySelector('#nome').value;
			aluno.sobrenome = document.querySelector('#sobrenome').value;
			aluno.telefone = document.querySelector('#telefone').value;
			aluno.ra = document.querySelector('#ra').value;

			console.log(aluno);

			if(aluno.id === undefined || aluno.id === 0){
				salvarEstudantes('POST', 0, aluno);
			}
			else
			{
				salvarEstudantes('PUT', aluno.id, aluno);
			}

			carregaEstudantes();

		}

		function NovoAluno(){
			var btnSalvar = document.querySelector('#btnSalvar');
			var titulo = document.querySelector('#titulo');

			document.querySelector('#nome').value = '';
			document.querySelector('#sobrenome').value = '' ;
			document.querySelector('#telefone').value = '' ;
			document.querySelector('#ra').value = '' ;

			aluno = {};

			btnSalvar.textContent = 'Cadastrar';

			titulo.textContent = 'Cadastrar Aluno';
		}

		function Cancelar(){
			var btnSalvar = document.querySelector('#btnSalvar');
			var titulo = document.querySelector('#titulo');

			document.querySelector('#nome').value = '';
			document.querySelector('#sobrenome').value = '' ;
			document.querySelector('#telefone').value = '' ;
			document.querySelector('#ra').value = '' ;

			aluno = {};

			btnSalvar.textContent = 'Cadastrar';

			titulo.textContent = 'Cadastrar Aluno';

		}

		function carregaEstudantes(){
			tbody.innerHTML='';
			var xhr = new XMLHttpRequest();

			xhr.open('GET', `http://localhost:8225/api/Aluno/`, true);

			xhr.onload = function () {
				var estudantes = JSON.parse(this.responseText);
				for(var indice in estudantes){
					adicionaLinha(estudantes[indice]);
				}
			}
			
			xhr.send();
			
		}

		function salvarEstudantes(metodo, id, corpo){

			var xhr = new XMLHttpRequest();

			if(id === undefined || id === 0)
				id = '';

			xhr.open(metodo, `http://localhost:8225/api/Aluno/${id}`, false);
			xhr.setRequestHeader('content-type', 'application/json');
			xhr.send(JSON.stringify(corpo));
			
		}

		carregaEstudantes();

		function editarEstudante(estudante){

			var btnSalvar = document.querySelector('#btnSalvar');
			var titulo = document.querySelector('#titulo');
			document.querySelector('#nome').value = estudante.nome;
			document.querySelector('#sobrenome').value = estudante.sobrenome ;
			document.querySelector('#telefone').value = estudante.telefone ;
			document.querySelector('#ra').value = estudante.ra ;

			btnSalvar.textContent = 'Salvar';

			titulo.textContent = `Editar Aluno ${estudante.nome}`;

			aluno = estudante;

			console.log(aluno);
		}

		function excluirEstudante(id){
			var xhr = new XMLHttpRequest();

			xhr.open('DELETE', `http://localhost:8225/api/Aluno/${id}`, false);

			xhr.send();

		}

		function excluir(id){
			bootbox.confirm({
				message: "Tem certeza que deseja excluir o estudante?",
				buttons: {
					confirm: {
						label: 'Sim',
						className: 'btn-success'
					},
					cancel: {
						label: 'Não',
						className: 'btn-danger'
					}
				},
				callback: function (result) {
					if(result){
						excluirEstudante(id);
						carregaEstudantes();
					}
				}
			});


		}

		function adicionaLinha(estudante){
			
			var trow = `<tr>
			<td>${estudante.nome}</td>
			<td>${estudante.sobrenome}</td>
			<td>${estudante.telefone}</td>
			<td>${estudante.ra}</td>
			<td><button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='editarEstudante(${JSON.stringify(estudante)})'>Editar</button></td>
			<td><button class="btn btn-danger" onclick='excluir(${estudante.id})'>Apagar</button></td>
			</tr>
			`

			tbody.innerHTML += trow;
		}
