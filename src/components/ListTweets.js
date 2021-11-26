import React from 'react';
import swal from 'sweetalert';
import { firestore } from '../firestore/firebase';

const ListTweets = (props) => {

    const clickHandleLike = (id, likes) => {
        if(!likes) likes = 0;
        firestore.doc(`tweets/${id}`).update({ likes: likes + 1 });
        console.log('le di like al tweet')
      };
    
      const clickHandleDelete = (id) => {
        swal({
          title: "¿Seguro que deseas eliminarlo?",
          text: "Una vez eliminado no podrás recuperar este tweet",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("Se elimino correctamente", {
              icon: "success",
            });
          } else {
            swal("Se guardo tu tweet");
          }
        });
        firestore.doc(`tweets/${id}`).delete()
      }

    return (
        <div className="list-tweets">
            { props.tweets && props.tweets.map((tweet, i ) => {
              return (
                <div className="tweet" key={i}>
                  <div className="info-tweet">
                    <img className="img-user" src={tweet.imagen} alt="" />
                    <p className="userName">@{tweet.usuario}</p>
                  </div>
                  <p className="tweet-content">{tweet.tweet}</p>
                  <span className="likes" onClick={ () => clickHandleLike(tweet.id, tweet.likes)}>
                    <button><img  src="./images/corazon.svg" alt="imagen de corazon" /></button>
                    <span>{tweet.likes ? tweet.likes : 0}</span>
                  </span>
                  <span className="trash" onClick={ () => clickHandleDelete(tweet.id)}>
                    {
                     tweet.uid === props.user.uid ? 
                    <img src="./images/delete.png" alt="imagen de residuo"/>
                    :
                   ""
                  }
                  </span>               
                </div>
              )
            })}    
        </div>
    )
}

export default ListTweets;