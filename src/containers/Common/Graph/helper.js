import {
  event,
  select,
  selectAll,
  zoomIdentity,
  forceManyBody,
  forceCenter,
  forceCollide,
  scaleOrdinal
} from 'd3'
import config from './config'

const helper = {}
helper.updateData = (context, diff) => {
  const { links } = context.state
  // remove nodes
  diff.removed.forEach(node => {
    context.nodes = context.nodes.filter(
      n => !(n.id === node.id && n.type === node.type)
    )
    // context.nodes.splice(context.nodes.indexOf(node))
  })
  // add new nodes
  diff.added.forEach(node => context.nodes.push(node))
  context.links = []
  // TODO: re-check
  links.forEach(link => {
    const sourceNode = context.nodes.filter(
      n => n.id === link.source && n.type === link.sourceType
    )[0]
    const targetNode = context.nodes.filter(
      n => n.id === link.target && n.type === link.targetType
    )[0]
    if (sourceNode && targetNode) {
      context.links.push({
        source: sourceNode,
        target: targetNode,
        type: link.type,
        occurence: link.occurence,
        typeOccurence: link.typeOccurence,
        results: link.results
      })
    }
  })
}

helper.updateLinks = context => {
  const {
    linkGroup,
    linkBgGroup,
    linkTextGroup,
    selectedEntityTypes
  } = context.state
  // link line
  const linkElements = linkGroup
    .selectAll('path')
    .data(context.links, link => link.target.id + link.source.id)
  linkElements.exit().remove()
  const linkEnter = linkElements
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('id', d => `${d.source.id}_${d.type}_${d.target.id}`)
    .attr('stroke-width', 1.5)
    .attr('fill', 'none')
    .attr('stroke', 'rgba(50, 50, 50, 0.2)')
    .attr('marker-end', 'url(#end)')
    .style('opacity', l =>
      selectedEntityTypes.length === 0 ||
      (selectedEntityTypes.indexOf(l.source.type) > -1 &&
        selectedEntityTypes.indexOf(l.target.type) > -1)
        ? '1'
        : config.linkOpacity
    )
    .on('click', link => {
      context.selectLink(link)
    })
    .on('mouseover', helper.handleMuseOver)
    .on('mouseout', helper.handleMuseOut)

  // link label bg line
  const linkBgElements = linkBgGroup
    .selectAll('text')
    .data(context.links, link => `${link.target.id}${link.source.id}`)
  linkBgElements.exit().remove()
  const linkBgEnter = linkBgElements
    .enter()
    .append('text')
    .style('pointer-events', 'none')
    .attr('fill', '#fff')
    .attr('font-size', 10)
    .attr('id', (link, i) => `linkBg${i}`)
    .attr('class', 'linkbg')
    .attr('dx', 0)
    .attr('dy', 5)
    .style('text-anchor', 'middle')
    .style('pointer-events', 'none')
    .attr('startOffset', '50%')
    .attr('filter', 'url(#solid)')
    .style('opacity', l =>
      selectedEntityTypes.length === 0 ||
      (selectedEntityTypes.indexOf(l.source.type) > -1 &&
        selectedEntityTypes.indexOf(l.target.type) > -1)
        ? '1'
        : config.linkOpacity
    )
    .text(link => link.type)
    .on('click', link => {
      context.selectLink(link)
    })

  // link labels
  const linkLabelElements = linkTextGroup
    .selectAll('text')
    .data(context.links, link => `${link.target.id}${link.source.id}`)
  linkLabelElements.exit().remove()
  const linkLabelEnter = linkLabelElements
    .enter()
    .append('text')
    .attr('class', 'linklabel')
    .on('click', link => {
      console.log('link click')
    })
    .style('opacity', l =>
      selectedEntityTypes.length === 0 ||
      (selectedEntityTypes.indexOf(l.source.type) > -1 &&
        selectedEntityTypes.indexOf(l.target.type) > -1)
        ? '1'
        : config.linkOpacity
    )
    .append('textPath')
    .style('pointer-events', 'none')
    .attr('fill', '#333')
    .attr('font-size', 10)
    .attr('id', (link, i) => `linklabel${i}`)
    .attr('dx', 0)
    .attr('dy', 5)
    .attr('xlink:href', d => `#${d.source.id}_${d.type}_${d.target.id}`)
    .style('text-anchor', 'middle')
    // .style('pointer-events', 'none')
    .attr('startOffset', '50%')
    .text(link => link.type)

  return {
    linkElements: linkEnter.merge(linkElements),
    linkBgElements: linkBgEnter.merge(linkBgElements),
    linkLabelElements: linkLabelEnter.merge(linkLabelElements)
  }
}

helper.updateNodes = context => {
  const {
    nodeGroup,
    textGroup,
    dragDrop,
    tooltip
  } = context.state
  // nodes
  const nodeElements = nodeGroup
    .selectAll('circle')
    .data(context.nodes, node => node.id)
  nodeElements.exit().remove()
  const nodeEnter = nodeElements
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('id', node => `node-${helper.cleanupString(node.id + node.type)}`)

  nodeEnter
    .append('defs')
    .append('clipPath')
    .attr('id', node => `thumbnailClip_${node.id}`)
    .append('circle')
    .attr('r', node => helper.getNodeSize(node) - 2)
    .attr('fill', '#fff')

  nodeEnter
    .append('circle')
    .attr('r', helper.getNodeSize)
    .attr('fill', '#fff')
    // .attr('fill', context.getNodeColor)
    .attr('stroke', context.getNodeColor)
    .attr('stroke-width', '3px')
  // .style(
  //   'opacity',
  //   c =>
  //     selectedEntityTypes.length === 0 ||
  //     selectedEntityTypes.indexOf(c.type) > -1
  //       ? '1'
  //       : config.nodeOpacity
  // )
  nodeEnter
    .append('image')
    .attr('xlink:href', d => d.thumbnail_url)
    .attr('clip-path', node => `url(#thumbnailClip_${node.id})`)
    .attr('x', node => -helper.getNodeSize(node))
    .attr('y', node => -helper.getNodeSize(node))
    .attr('width', node => helper.getNodeSize(node) * 2.2)
  // .attr('height', node => node.type === 'AUTHOR' ? helper.getNodeSize(node) * 2 : null)
  // .attr('width', node => node.type === 'BOOK' ? helper.getNodeSize(node) * 2 : null)

  nodeEnter
    .call(dragDrop)
    // .on('dblclick', context.expandNode)
    .on('click', context.selectNode)
    .on('contextmenu', node => helper.rightClick(node, context))
    .on('mouseover', node => helper.onMouseOver(node, tooltip))
    .on('mousemove', node => helper.onMouseMove(node, tooltip))
    .on('mouseout', node => helper.onMouseOut(node, tooltip))

  // text
  const textElements = textGroup
    .selectAll('text')
    .data(context.nodes, node => node.id)
  textElements.exit().remove()

  // Disable textElement
  // const textEnter = textElements
  //   .enter()
  //   .append('text')
  //   .text(node => helper.getNodeLabel(node))
  //   .attr(
  //     'id',
  //     node => `nodeLabel-${helper.cleanupString(node.id + node.type)}`
  //   )
  //   .attr('font-size', 14)
  //   .attr('dx', -config.nodeSize + 3)
  //   .attr('dy', 4)
  //   .attr('fill', '#fff')
  //   .call(dragDrop)
  //   // .on('dblclick', context.expandNode)
  //   .on('click', context.selectNode)
  //   .on('contextmenu', node => helper.rightClick(node, context))
  //   .on('mouseover', node => helper.onMouseOver(node, tooltip))
  //   .on('mousemove', node => helper.onMouseMove(node, tooltip))
  //   .on('mouseout', node => helper.onMouseOut(node, tooltip))

  return {
    // textElements: textEnter.merge(textElements),
    textElements,
    nodeElements: nodeEnter.merge(nodeElements)
  }
}

helper.getElements = context => {
  // get link elements
  const {
    linkElements,
    linkBgElements,
    linkLabelElements
  } = helper.updateLinks(context)

  // get node elements
  const { nodeElements, textElements, tooltipElements } = helper.updateNodes(
    context
  )

  return {
    linkElements,
    linkBgElements,
    linkLabelElements,
    nodeElements,
    textElements,
    tooltipElements
  }
}

helper.updateSimulations = context => {
  const { simulation, zoomHandler } = context.state
  const {
    linkElements,
    linkBgElements,
    linkLabelElements,
    nodeElements,
    textElements
  } = helper.getElements(context)
  simulation
    .nodes(context.nodes)
    .on('tick', () =>
      helper.onTick(
        context,
        linkElements,
        linkBgElements,
        linkLabelElements,
        nodeElements,
        textElements
      )
    )
  simulation.force('link').links(context.links)
  simulation
    .force('attraceForce', forceManyBody().strength(7))
    .force('charge', forceManyBody().strength(-7))
    .force(
      'collision',
      forceCollide()
        .radius(config.nodeSize + 5)
        .strength(0.4)
    )
  if (context.initialRender) {
    simulation.force(
      'center',
      forceCenter(context.state.width / 2, context.state.height / 2)
    )
    setTimeout(() => {
      // simulation.force('center', null)
      simulation.stop()
      if (context.initialRender) {
        // helper.zoomFit(select('.d3graph'), zoomHandler, 500)
        context.initialRender = false
      }
    }, 2000)
  }
  // simulation.alphaTarget(1).restart()
  simulation
    .alpha(1)
    .alphaTarget(0)
    .velocityDecay(0.3)
    .restart()
}

/**
 * Gives the coordinates of the border for keeping the nodes inside a frame
 * http://bl.ocks.org/mbostock/1129492
 */
function nodeTransform (d) {
  // d.x = Math.max(config.nodeSize, Math.min(w - (d.imgwidth / 2 || 16), d.x))
  // d.y = Math.max(config.nodeSize, Math.min(h - (d.imgheight / 2 || 16), d.y))
  return `translate(${d.x},${d.y})`
}

helper.onTick = (
  context,
  linkElements,
  linkBgElements,
  linkLabelElements,
  nodeElements,
  textElements
) => {
  // nodeElements.attr('cx', node => node.x).attr('cy', node => node.y)
  nodeElements.attr('transform', nodeTransform)
  // nodeElements.attr('x', node => node.x).attr('y', node => node.y)
  textElements.attr('x', node => node.x).attr('y', node => node.y)
  // TODO: re-check link.source.x
  /* linkElements
    .attr('x1', link => link.source.x)
    .attr('y1', link => link.source.y)
    .attr('x2', link => link.target.x)
    .attr('y2', link => link.target.y) */
  // arrowElements.attr('d', helper.linkLine)
  linkElements.attr('d', d => helper.arcPath(true, d, context))
  linkBgElements.attr('transform', d => {
    const angle =
      (Math.atan((d.source.y - d.target.y) / (d.source.x - d.target.x)) * 180) /
      Math.PI
    return `translate(${[
      (d.source.x + d.target.x) / 2,
      (d.source.y + d.target.y) / 2
    ]})rotate(${angle})`
  })
  /* linkLabelElements.attr('transform', d => {
    const angle =
      Math.atan((d.source.y - d.target.y) / (d.source.x - d.target.x)) *
      180 /
      Math.PI
    return `translate(${[
      (d.source.x + d.target.x) / 2,
      (d.source.y + d.target.y) / 2
    ]})rotate(${angle})`
  }) */
}

helper.getNodeSize = node => {
  // const mode = 'rating'

  // let diameter = config.nodeSize
  // let minp = 1
  // let maxp = 1000
  // let position = (typeof node.num_pages === 'undefined' || typeof node.num_pages === 'object') ? 500 : parseInt(node.num_pages)

  // if (mode === 'rating') {
  //   minp = 0
  //   maxp = 5
  //   position = node.average_rating

  //   const minv = Math.log(config.nodeSize - 10)
  //   const maxv = Math.log(config.nodeSize + 10)

  //   // calculate adjustment factor
  //   const scale = (maxv - minv) / (maxp - minp)

  //   diameter = parseInt(Math.exp(minv + scale * (position - minp)))
  // } else if (mode === 'pages') {
  //   const minv = config.nodeSize - 10
  //   const maxv = config.nodeSize + 10

  //   // calculate adjustment factor
  //   const scale = (maxv - minv) / (maxp - minp)

  //   diameter = parseInt(minv + scale * (position - minp))
  // }

  // console.log(`${node.text} - ${mode}(${JSON.stringify(position, null, 2)}) : ${diameter} : ${node.num_pages}`)
  // return diameter
  if (node.type === 'AUTHOR') {
    return config.nodeSize + 5
  }
  return config.nodeSize - 2
}

helper.getLinkColor = (node, link) =>
  this.isNeighborLink(node, link) ? 'black' : '#E5E5E5'

helper.getTextColor = (node, neighbors) =>
  Array.isArray(neighbors) && neighbors.indexOf(node.id) > -1
    ? 'green'
    : 'black'

// helper.getLinkDistance = link => {
// if (link.source.level === 1 && link.target.level === 1) {
// return 400
// }
// return helper.getNodeCount(link.target, this.nodes) * 30

// // return 200
// }

helper.getNodeLabel = node =>
  // Array.isArray(neighbors) && neighbors.indexOf(node.id) > -1 ? node.label : ''
  node.id.length > config.labelLength
    ? `${node.id.slice(0, config.labelLength)}`
    : node.id

helper.isNeighborLink = (node, link) =>
  link.target.id === node.id || link.source.id === node.id

helper.rightClick = (node, context) => {
  event.preventDefault()
  const { simulation } = context.state
  node.fx = null
  node.fy = null
  simulation.alphaTarget(0.5).restart()
  setTimeout(() => {
    simulation.stop()
  }, 500)
}

helper.containsNode = (node, nodes) =>
  nodes.reduce((acc, n) => {
    if (n.id === node.id) {
      acc.push(n)
    }
    return acc
  }, []).length > 0
    ? 1
    : 0

helper.diff = (prevNodes, newNodes) => ({
  removed: prevNodes.filter(node => helper.containsNode(node, newNodes) === 0),
  added: newNodes.filter(node => helper.containsNode(node, prevNodes) === 0)
})

helper.getNodeCount = (node, nodes) =>
  nodes.reduce((acc, n) => {
    if (n.type === node.type) {
      acc.push(n)
    }
    return acc
  }, []).length

helper.handleMuseOver = (l, i, x) => {
  select(x[i]).attr('stroke-width', 2)
}

helper.handleMuseOut = (l, i, x) => {
  select(x[i]).attr('stroke-width', 1.5)
}

helper.getNodeOpacity = (node, neighbors) => {
  if (Array.isArray(neighbors) && neighbors.indexOf(node.id + node.type) > -1) {
    return '1'
  }
  return config.nodeOpacity
}

helper.getLinkOpacity = (link, neighbors) => {
  if (
    Array.isArray(neighbors) &&
    neighbors.indexOf(link.source.id + link.source.type) > -1 &&
    neighbors.indexOf(link.target.id + link.target.type) > -1
  ) {
    return '1'
  }
  return config.linkOpacity
}
helper.updateElementProperties = selectedEntityTypes => {
  selectAll('.node').style('opacity', c =>
    selectedEntityTypes.length === 0 || selectedEntityTypes.indexOf(c.type) > -1
      ? '1'
      : config.nodeOpacity
  )
  selectAll('.link').style('opacity', l =>
    selectedEntityTypes.length === 0 ||
    (selectedEntityTypes.indexOf(l.source.type) > -1 &&
      selectedEntityTypes.indexOf(l.target.type) > -1)
      ? '1'
      : config.linkOpacity
  )
  selectAll('.linklabel').style('opacity', l =>
    selectedEntityTypes.length === 0 ||
    (selectedEntityTypes.indexOf(l.source.type) > -1 &&
      selectedEntityTypes.indexOf(l.target.type) > -1)
      ? '1'
      : config.linkOpacity
  )
}
helper.zoomFit = (root, zoom, transitionDuration) => {
  const bounds = root.node().getBBox()
  const parent = root.node().parentElement
  // const currentScale = root.node().__zoom.k
  const fullWidth = parent.clientWidth || parent.parentNode.clientWidth
  const fullHeight = parent.clientHeight || parent.parentNode.clientHeight
  const { width, height } = bounds
  const midX = bounds.x + width / 2
  const midY = bounds.y + height / 2
  if (width === 0 || height === 0) return // nothing to fit
  const scale = 0.85 / Math.max(width / fullWidth, height / fullHeight)
  const translate = [
    fullWidth / 2 - scale * midX,
    fullHeight / 2 - scale * midY
  ]

  root
    .transition()
    .duration(transitionDuration || 0) // milliseconds
    .call(
      zoom.transform,
      zoomIdentity.translate(translate[0], translate[1]).scale(scale)
    )
}

helper.onMouseOver = (d, tooltip) => {
  const text =
    d.type === 'AUTHOR' ? `${d.text}` : `${d.text} : <i>${d.property.shelf}</i>`
  tooltip
    .transition()
    .duration(200)
    .style('opacity', '1')
  tooltip
    .html(text)
    .style(
      'transform',
      `translateX(${event.x + 15}px) translateY(${event.y}px)`
    )
}

helper.onMouseMove = (d, tooltip) => {
  const text =
    d.type === 'AUTHOR' ? `${d.text}` : `${d.text} : <i>${d.property.shelf}</i>`
  tooltip
    .html(text)
    .style(
      'transform',
      `translateX(${event.x + 15}px) translateY(${event.y}px)`
    )
}

helper.onMouseOut = (d, tooltip) => {
  tooltip
    .transition()
    .duration(100)
    .style('opacity', '0')
}

// links
helper.getLinks = (source, target, context) =>
  context.links
    .filter(
      link =>
        link.source.id === source.id &&
        link.source.type === source.type &&
        link.target.id === target.id &&
        link.target.type === target.type
    )
    .map(l => l.type)

helper.linkArc = d => {
  const dx = d.target.x - d.source.x
  const dy = d.target.y - d.source.y
  const dr = Math.sqrt(dx * dx + dy * dy)
  return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${
    d.target.y
  }`
}
helper.linkLine = d =>
  `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`

helper.arcPath = (dir, d, context) => {
  const x1 = dir ? d.source.x : d.target.x
  const y1 = dir ? d.source.y : d.target.y
  const x2 = dir ? d.target.x : d.source.x
  const y2 = dir ? d.target.y : d.source.y
  const dx = x2 - x1
  const dy = y2 - y1
  const siblings = helper.getLinks(d.source, d.target, context)
  const siblingCount = siblings.length
  const xRotation = 0
  const largeArc = 0

  if (siblingCount > 1) {
    // console.log(siblings)
    const arcScale = scaleOrdinal()
      .domain(siblings)
      .range([1, siblingCount])
    const linkIdx = arcScale(d.type)
    let scale
    let sweep
    if (linkIdx === 1) {
      sweep = 1
      scale = 1
      // return `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`
    } else if (linkIdx % 2 === 0) {
      sweep = 0
      scale = linkIdx / 2
    } else if (linkIdx % 3 === 0) {
      sweep = 1
      scale = linkIdx / 3 + 1
    }
    const dr =
      Math.sqrt(dx * dx + dy * dy) / (1 + (1 / siblingCount) * (scale - 1))
    return `M${x1},${y1}A${dr * 1.7},${dr *
      1.7} ${xRotation}, ${largeArc}, ${sweep} ${x2},${y2}`
  }
  return `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`
}
helper.cleanupString = str => str.replace(/\W+/g, '_')

export default helper
