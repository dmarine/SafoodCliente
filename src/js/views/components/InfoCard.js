let InfoCard = {
  render: async () => {
    return `<div class="l-columns l-columns--3-columns l-columns--m-2-columns l-columns--s-1-columns">
                <div class="info">
                <i class="fab fa-weixin info__highlight"></i>
                <h3 class="info__title">Quienes somos</h3>
                <p class="info__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum, neque quis luctus
                    efficitur, risus diam fringilla arcu, at mattis quam magna a quam. Nulla ante sem, venenatis sit amet
                    posuere vel, pharetra eu ante.
                </p>
                </div>
                <div class="info">
                <i class="fa fa-lightbulb info__highlight"></i>
                <h3 class="info__title">Idea</h3>
                <p class="info__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum, neque quis luctus
                    efficitur, risus diam fringilla arcu, at mattis quam magna a quam. Nulla ante sem, venenatis sit amet
                    posuere vel, pharetra eu ante.
                </p>
                </div>
                <div class="info">
                <i class="fa fa-users info__highlight"></i>
                <h3 class="info__title">Autores</h3>
                
                <p class="info__text"><i class="fa fa-user"></i> Daniel Marín</p>
                <p class="info__text"><i class="fa fa-user"></i> David Jiménez</p>
                <p class="info__text"><i class="fa fa-user"></i> Jose Antonio Rodríguez</p>
                <p class="info__text"><i class="fa fa-user"></i> Miguel Martínez </p>
                <p class="info__text"><i class="fa fa-user"></i> Liberto Álvarez </p>
                </div>
            </div>`
  },
  after_render: async () => {
  }
}

export { InfoCard }