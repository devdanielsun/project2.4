export interface ProfileI {
    userId: number;
    tokenValid: boolean;
    newToken: string;
    message: {
        id: number;
        name: string;
        lastname: string;
        email: string;
        admin: boolean;
    };
    admin: boolean;
}

export interface FriendResponce {
    userId: number;
    tokenValid: boolean;
    newToken: string;
    message: {
      followers: [{
        id: number;
        name: string;
        lastname: string;
        email: string;
        admin: boolean;
      }],
      following: [{
        id: number;
        name: string;
        lastname: string;
        email: string;
        admin: boolean;
      }]
    };
    admin: boolean;
  }

export interface addfriend {
    userId: number;
    tokenValid: boolean;
    newToken: string;
    message: {
        id: number;
        u1: string;
        u2: string;
    };
    admin: boolean;
}