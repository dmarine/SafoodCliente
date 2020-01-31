let Error404 = {
  render: async () => {
    return `<div class="error-page">
                <h1 class="error-page__text">Error 404</h1>
                <a  class="error-page__back" href="javascript:window.history.back();">&#10094;</a>
                <p class="error-page__cat">
                         ,
  ,-.       _,---._ __  / &bsol;
 /  )    .-'       &grave;./ /   &bsol;
(  (   ,'            &grave;/    /|
 &bsol;  '-"             &bsol;'&bsol;   / |
  '.              ,  &bsol; &bsol; /  |
   /&grave;.          ,'-&grave;----Y   |
  (            ;        |   '
  |  ,-.    ,-'         |  /
  |  | (   |            | /
  )  |  &bsol;  &grave;.___________|/
   &grave;--'   &grave;--'
         </p>
            </div>`
  },
  renderMenu: async () => {
  },
  after_render: async () => {
  }
};

export { Error404 };