export class Environment {
    private static instance: Environment;
    private readonly env: string;
    private readonly apiUrl: string;
    private readonly tenantDomain: string;
    private readonly baseUrl: string;
    private readonly agGridLicenseKey: string;
    private readonly signalrHubUrl: string;
  
    private constructor() {
      const { origin } = window.location;
  
      this.env = process.env.NODE_ENV ?? '';
      this.apiUrl = process.env.NX_REACT_APP_API_URL ?? `${origin}/mypoc/api/`;
      this.tenantDomain = process.env.NX_REACT_TENANT_DOMAIN ?? '';
      this.baseUrl = origin;
      this.agGridLicenseKey = process.env.NX_AG_GRID_LICENSE_KEY ?? '';
      this.signalrHubUrl =
        process.env.NX_REACT_APP_HUB_URL ??
        `${origin}/mypoc-hub?tenant=${window.location.hostname}`;
    }
  
    private static getInstance(): Environment {
      if (!Environment.instance) {
        Environment.instance = new Environment();
      }
  
      return Environment.instance;
    }
  
    public static getApiUrl(): string {
      const env = Environment.getInstance();
      return env.apiUrl;
    }
  
    public static getTenantDomain(): string {
      const env = Environment.getInstance();
      return env.tenantDomain;
    }
  
    public static isDevelopment() {
      const env = Environment.getInstance();
      return env.env === 'development';
    }
  
    public static getLogoutRedirectUri(): string {
      const env = Environment.getInstance();
      return `${env.baseUrl}/login`;
    }
  
    public static getRedirectUri(): string {
      const env = Environment.getInstance();
      return `${env.baseUrl}/login/callback`;
    }
  
    public static isLocalhost(): boolean {
      const env = Environment.getInstance();
      return env.baseUrl.includes('localhost');
    }
  
    public static getAgGridLicenseKey(): string {
      const env = Environment.getInstance();
      return env.agGridLicenseKey;
    }
  
    public static getSignalrHubUrl(): string {
      const env = Environment.getInstance();
      return env.signalrHubUrl;
    }
  
    public static getSubDomain(): string {
      const env = Environment.getInstance();
      const result = /:\/\/([^/]+)/.exec(env.baseUrl);
      return result ? result[1].split('.')[0] : '';
    }
  }
  