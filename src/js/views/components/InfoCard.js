let InfoCard = {
  render: async () => {
    return `<div class="l-columns l-columns--3-columns l-columns--2-columns@tablet l-columns--1-columns@mobile">
                <div class="info">
                <i class="fab fa-weixin info__highlight"></i>
                <h3 class="info__title">Quienes somos</h3>
                <p class="info__text">
                    Somos una startup compuesta por antiguos compañeros de 2ºDaw, tuvimos la idea de crear una plataforma 
                    para ayudar a las personas con problemas alimentarios.
                </p>
                </div>
                <div class="info">
                <img style="height: 5rem;width: 5rem;align-self: center;" src="images/logo-safood.png">
                <h3 class="info__title"></h3>
                <p class="info__text">
                    Safood es una web dedicada a la venta de comida donde ponemos expecial interes en los alergenos que tienen, 
                    para que puedas hacer tus pedidos sin preocupaciones
                </p>
                </div>
                <div class="info">
                <i class="fa fa-users info__highlight"></i>
                <h3 class="info__title">Autores</h3>
                
                <p class="info__text"><i class="fa fa-user"></i> Daniel Marín</p>
                <p class="info__text"><i class="fa fa-user"></i> David Jiménez</p>
                <p class="info__text"><i class="fab fa-facebook-f"></i>&nbsp; Miguel Martínez </p>
                <p class="info__text"><i class="fa fa-user"></i> Jose Antonio Rodríguez</p>
                <p class="info__text"><i class="fa fa-user"></i> Liberto Álvarez </p>
                </div>
            </div>`
  },
  after_render: async () => {
  }
}

export { InfoCard }