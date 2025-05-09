// deleteConfirmLoading.js - Adiciona estado de carregamento ao botão de confirmação de exclusão
import { showLoading, hideLoading } from './loadingStates.js';

// Aguardar o carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
  // Botão de confirmação de exclusão
  const confirmDeleteButton = document.querySelector('.popup__confirm-button');
  const confirmDeletePopup = document.querySelector('.popup__container_type_confirm');
  
  if (confirmDeleteButton) {
    // Preservar o comportamento original
    const originalOnClick = confirmDeleteButton.onclick;
    
    // Substituir o evento de clique
    confirmDeleteButton.onclick = function(event) {
      // Mostrar o estado de carregamento
      showLoading(confirmDeleteButton, 'Excluindo...');
      
      // Se houver um evento de clique original, chamá-lo
      if (typeof originalOnClick === 'function') {
        // Esperar a conclusão da operação (isso pressupõe que o código original fecha o popup)
        const originalCloseMethod = () => {
          if (confirmDeletePopup) {
            confirmDeletePopup.classList.remove('popup_opened');
            confirmDeletePopup.style.display = 'none';
          }
        };
        
        // Interceptar o método de fechar popup para restaurar o estado do botão
        const closePopupInterceptor = () => {
          // Restaurar o estado original do botão
          hideLoading(confirmDeleteButton);
          // Chamar o método original
          originalCloseMethod();
        };
        
        // Substituir temporariamente o método de fechar
        const popupCloseBackup = window.closePopup;
        if (typeof window.closePopup === 'function') {
          window.closePopup = function(popup) {
            if (popup === confirmDeletePopup) {
              closePopupInterceptor();
            } else {
              popupCloseBackup(popup);
            }
          };
          
          // Restaurar o método original após um tempo
          setTimeout(() => {
            window.closePopup = popupCloseBackup;
          }, 2000);
        }
        
        // Chamar o evento de clique original
        originalOnClick.call(this, event);
      } else {
        // Se não houver evento original, simplesmente esconder o carregamento após um tempo
        setTimeout(() => {
          hideLoading(confirmDeleteButton);
        }, 2000);
      }
    };
  }
});