import React from 'react'
import {
  select,
  forceLink,
  forceSimulation,
  event,
  zoom,
  drag
} from 'd3'
import PropTypes from 'prop-types'
import helper from './helper'
import config from './config'

import './styles.scss'

// TODO: click actions, legend, filter
class Graph extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      width: props.width,
      height: props.height,
      selectedId: null,
      linkGroup: null,
      nodeGroup: null,
      textGroup: null,
      dragDrop: null,
      simulation: null,
      nodes: [],
      links: [],
      selectedEntityTypes: props.selectedEntityTypes,
      entityTypeUpdate: false
    }
    this.getNeighbors = this.getNeighbors.bind(this)
    this.getNodeColor = this.getNodeColor.bind(this)
    this.drawGraph = this.drawGraph.bind(this)
    this.selectNode = this.selectNode.bind(this)
    this.selectLink = this.selectLink.bind(this)
    this.updateGraph = this.updateGraph.bind(this)
    this.getLinkDistance = this.getLinkDistance.bind(this)
    this.expandNode = this.expandNode.bind(this)
    this.nodes = []
    this.links = []
    this.selectedId = null
    this.initialRender = true
    this.wait = null
  }

  componentDidMount () {
    this.drawGraph()
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      ...nextProps
    })
    if (
      nextProps.selectedEntityTypes.length !==
      this.state.selectedEntityTypes.length
    ) {
      this.setState({ entityTypeUpdate: true })
    } else {
      this.setState({ entityTypeUpdate: false })
    }
  }

  getNeighbors (node) {
    const { selectedEntityTypes } = this.state
    return this.links.reduce(
      (neighbors, link) => {
        if (link.target.id === node.id && link.target.type === node.type) {
          neighbors.push(link.source.id + link.source.type)
        } else if (
          link.source.id === node.id &&
          link.source.type === node.type
        ) {
          neighbors.push(link.target.id + link.target.type)
        } else if (selectedEntityTypes.indexOf(link.source.type) > -1) {
          neighbors.push(link.source.id + link.source.type)
        } else if (selectedEntityTypes.indexOf(link.target.type) > -1) {
          neighbors.push(link.target.id + link.target.type)
        }
        return neighbors
      },
      [node.id + node.type]
    )
  }

  getNeighborsRaw (node) {
    return this.links.reduce(
      (neighbors, link) => {
        if (link.target.id === node.id) {
          neighbors.push(link.source.id)
        } else if (link.source.id === node.id) {
          neighbors.push(link.target.id)
        }
        return neighbors
      },
      [node.id]
    )
  }

  getNodeColor (node) {
    if (node.type === 'AUTHOR') {
      return this.props.entityColors[node.type]
    }
    return this.props.entityColors[node.property.shelf]
  }

  getLinkDistance (link) {
    // TODO: Fix this
    /* if (link.sourceLevel === 1 && link.targetLevel === 1) {
      return 400
    }
    const count = helper.getNodeCount(link.source, this.nodes)
    if (count < 5) {
      return 140
    } else if (count < 10) {
      return 200
    } else if (count < 20) {
      return 260
    } */
    return 170
    // return 200
  }

  selectNode (node) {
    if (this.wait) {
      clearTimeout(this.wait)
      this.wait = null
      this.expandNode(node)
      this.props.setPropertiesInfo({
        type: 'nodes',
        index: this.props.nodes.map(n => n.id).indexOf(node.id)
      })
    } else {
      this.wait = setTimeout(() => {
        if (!(this.selectedId === node.id)) {
          this.selectedId = null
          this.selectedId = node.id
          this.props.setPropertiesInfo({
            type: 'nodes',
            index: this.props.nodes.map(n => n.id).indexOf(node.id)
          })
        }
        this.wait = null
      }, config.clickDelay)
    }
  }

  selectLink (link) {
    console.log(link)
    this.props.setPropertiesInfo({
      type: 'links',
      index: this.props.links
        .map(l => l.source + l.target + l.type)
        .indexOf(link.source.id + link.target.id + link.type)
    })
  }

  expandNode (node) {
    select(`#node-${helper.cleanupString(node.id + node.type)}`)
      .attr('stroke', '#222')
      .attr('stroke-width', '1.5px')
    this.props.expandNode(node)
  }

  updateGraph () {
    const { nodeGroup, nodes, links, selectedEntityTypes } = this.state
    if (nodeGroup) {
      const diff = helper.diff(this.nodes, nodes)
      console.log('DIFF')
      console.log(diff)
      // check if any nodes are to be added/removed
      if (
        diff.added.length > 0 ||
        diff.removed.length > 0 ||
        links.length !== this.links.length
      ) {
        // update data
        helper.updateData(this, diff)
        // update simulations
        helper.updateSimulations(this)
      }
      if (this.state.entityTypeUpdate) {
        helper.updateElementProperties(selectedEntityTypes)
      }
    }
  }

  drawGraph () {
    const svg = select('.d3graph')
    // add master element for the zoom
    const g = svg.insert('g', ':first-child').attr('class', 'universe')
    // define div for tooltip
    const tooltip = select('.tooltip')
    /* if (tooltip.node() === null) {
      tooltip = select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)
    } */
    // simulation setup with link force
    const linkForce = forceLink()
      .id(link => link.id)
      .strength(0.4)
      .distance(link => this.getLinkDistance(link))
    const simulation = forceSimulation().force('link', linkForce)

    const dragDrop = drag()
      .on('start', node => {
        if (!event.active) {
          simulation.alphaTarget(0.4).restart()
        }
        node.fx = node.x
        node.fy = node.y
      })
      .on('drag', node => {
        // simulation.alphaTarget(0.7).restart()
        tooltip.transition()
          .duration(100)
          .style('opacity', '0')
        node.fx = event.x
        node.fy = event.y
      })
      .on('end', () => {
        if (!event.active) {
          // simulation.alphaTarget(0.1)
          simulation.stop()
        }
      })
    // add zoom capabilities
    const zoomHandler = zoom().on('zoom', () => {
      g.attr('transform', event.transform)
      select('.zoomIndicator').text(`
        ${parseInt(event.transform.k * 100, 10)}%
      `)
    })
    // build link arrow and link label bg
    g.html(
      '<defs><filter x="0" y="0.28" width="1" height="0.25" id="solid"><feFlood flood-color="white"/></filter><marker id="end" viewBox="0 -5 10 10" refX="37" refY="0" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,-5L10,0L0,5" fill="#666"/></marker></defs>'
    )
    const linkGroup = g.append('g').attr('class', 'links')
    const linkBgGroup = g.append('g').attr('class', 'linkbgs')
    const linkTextGroup = g.append('g').attr('class', 'linklabels')
    const nodeGroup = g.append('g').attr('class', 'nodes')
    const textGroup = g.append('g').attr('class', 'texts')

    // mouse scroll zooming
    // zoomHandler(svg)
    svg.call(zoomHandler).on('dblclick.zoom', null)
    // button zooming
    select('#zoom-in').on('click', () => {
      zoomHandler.scaleBy(svg.transition().duration(150), 1.5)
    })
    select('#zoom-out').on('click', () => {
      zoomHandler.scaleBy(svg.transition().duration(150), 1 / 1.5)
    })

    this.setState({
      linkGroup,
      nodeGroup,
      textGroup,
      tooltip,
      linkBgGroup,
      linkTextGroup,
      simulation,
      dragDrop,
      width: svg.attr('width'),
      height: svg.attr('height'),
      zoomHandler
    })
  }

  render () {
    this.updateGraph()
    return <svg className='d3graph' width='100%' height='100%' />
  }
}

Graph.defaultProps = {
  width: 800,
  height: 600,
  nodes: [],
  links: [],
  selectedEntityTypes: []
}

Graph.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  setPropertiesInfo: PropTypes.func.isRequired,
  expandNode: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  entityColors: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  nodes: PropTypes.array,
  // eslint-disable-next-line react/forbid-prop-types
  links: PropTypes.array,
  // eslint-disable-next-line react/forbid-prop-types
  selectedEntityTypes: PropTypes.array
  // eslint-disable-next-line react/forbid-prop-types
}

export default Graph
