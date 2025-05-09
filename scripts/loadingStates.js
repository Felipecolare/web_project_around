// loadingStates.js - Script para gerenciar os estados de carregamento nos formulários

// Função para mostrar o estado de carregamento em um botão
function showLoading(button, loadingText) {
  if (!button) return;
  
  // Armazenar o texto original como um atributo de dados
  button.dataset.originalText = button.textContent;
  
  // Alterar o texto para indicar carregamento
  button.textContent = loadingText || 'Salvando...';
  
  // Opcional: desabilitar o botão durante o carregamento
  button.disabled = true;
}

// Função para restaurar o estado original do botão
function hideLoading(button) {
  if (!button) return;
  
  // Restaurar o texto original
  if (button.dataset.originalText) {
    button.textContent = button.dataset.originalText;
  }
  
  // Reativar o botão
  button.disabled = false;
}

// Função para aplicar o comportamento de loading state a um formulário
function applyLoadingState(formElement, submitCallback, loadingText) {
  if (!formElement || !submitCallback) return;
  
  // Remover event listeners existentes
  const newForm = formElement.cloneNode(true);
  formElement.parentNode.replaceChild(newForm, formElement);
  
  // Adicionar o novo event listener com o estado de carregamento
  newForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obter o botão de submit
    const submitButton = newForm.querySelector('button[type="submit"]');
    
    // Mostrar o estado de carregamento
    showLoading(submitButton, loadingText);
    
    // Chamar o callback original, passando o evento, formulário e uma função para esconder o carregamento
    submitCallback(event, newForm, function() {
      hideLoading(submitButton);
    });
  });
  
  return newForm;
}

// Exportar as funções para uso em outros arquivos
export { showLoading, hideLoading, applyLoadingState };