import test from 'ava'

test('Wave 5: 2D Affine coordinate rotation matrix calculation for SMD component footprint', (t) => {
  const rotatePoint = (x: number, y: number, angleDeg: number) => {
    const rad = (angleDeg * Math.PI) / 180
    const cos = Math.round(Math.cos(rad) * 1000) / 1000
    const sin = Math.round(Math.sin(rad) * 1000) / 1000
    return {
      x: Math.round((x * cos - y * sin) * 100) / 100,
      y: Math.round((x * sin + y * cos) * 100) / 100,
    }
  }

  // 90 deg rotation of (10, 0) -> (0, 10)
  const r90 = rotatePoint(10, 0, 90)
  t.is(r90.x, 0)
  t.is(r90.y, 10)

  // 180 deg rotation of (10, 5) -> (-10, -5)
  const r180 = rotatePoint(10, 5, 180)
  t.is(r180.x, -10)
  t.is(r180.y, -5)
})

test('Wave 5: Component bounding box expansion margin under rotation', (t) => {
  const getRotatedAABB = (width: number, height: number, angleDeg: number) => {
    const rad = (angleDeg * Math.PI) / 180
    const cos = Math.abs(Math.cos(rad))
    const sin = Math.abs(Math.sin(rad))
    return {
      width: Math.round((width * cos + height * sin) * 100) / 100,
      height: Math.round((width * sin + height * cos) * 100) / 100,
    }
  }

  const aabb90 = getRotatedAABB(20, 10, 90)
  t.is(aabb90.width, 10)
  t.is(aabb90.height, 20)
})
