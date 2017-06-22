import { Network } from '@ionic-native/network';
import { Injectable } from "@angular/core";

@Injectable()
export class NetworkService {

   constructor(private network: Network) {}

   verify(){
       this.network.onDisconnect().subscribe(() => {
           alert('network was disconnected :-(');
        });

        this.network.onConnect().subscribe(() => {
          alert('network connected!');
          // We just got a connection but we need to wait briefly
           // before we determine the connection type.  Might need to wait 
          // prior to doing any api requests as well.
          setTimeout(() => {
            if (this.network.type === 'wifi') {
//               alert('we got a wifi connection, woohoo!');
                let hola = 0;
            }
          }, 3000);
        });
   }

}