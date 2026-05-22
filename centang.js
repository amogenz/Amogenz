class Centang extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          vertical-align: middle;
          /* Ukuran default kalau kamu lupa nulis style di HTML */
          width: 17px; 
          height: 17px; 
          line-height: 1;
        }
        .centang-sm { 
          width: 100%; 
          height: 100%; 
          display: block;
          filter: drop-shadow(0 0 5px rgba(57, 255, 20, 0.4)); 
        }
      </style>
      <svg class="centang-sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5213 2.62368C11.3147 1.75255 12.6853 1.75255 13.4787 2.62368L14.6565 3.9168C15.0116 4.30666 15.5222 4.51806 16.05 4.49313L17.8013 4.41041C18.9809 4.3547 19.9577 5.33149 19.902 6.51108L19.8193 8.26233C19.7943 8.79017 20.0057 9.3008 20.3956 9.65588L21.6887 10.8337C22.5598 11.6271 22.5598 12.9977 21.6887 13.7911L20.3956 14.969C20.0057 15.324 19.7943 15.8347 19.8193 16.3625L19.902 18.1138C19.9577 19.2933 18.9809 20.2701 17.8013 20.2144L16.05 20.1317C15.5222 20.1068 15.0116 20.3182 14.6565 20.708L13.4787 22.0012C12.6853 22.8723 11.3147 22.8723 10.5213 22.0012L9.3435 20.708C8.98843 20.3182 8.47779 20.1068 7.95001 20.1317L6.19875 20.2144C5.01916 20.2701 4.04236 19.2933 4.09807 18.1138L4.18079 16.3625C4.20572 15.8347 3.99432 15.324 3.60446 14.969L2.31133 13.7911C1.4402 12.9977 1.4402 11.6271 2.31133 10.8337L3.60446 9.65588C3.99432 9.3008 4.20572 8.79017 4.18079 8.26233L4.09807 6.51108C4.04236 5.33149 5.01916 4.3547 6.19875 4.41041L7.95001 4.49313C8.47779 4.51806 8.98843 4.30666 9.3435 3.9168L10.5213 2.62368Z" fill="#39FF14"/>
        <path d="M9 12L11 14L15 10" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }
}
customElements.define('c-centang', Centang);
